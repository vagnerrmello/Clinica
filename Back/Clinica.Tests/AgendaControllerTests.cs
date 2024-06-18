using Clinica.Dominio.DTOs;
using Clinica.Dominio.Entidades;
using Clinica.Infra.Interface;
using Clinica.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace Clinica.Tests
{
    public class AgendaControllerTests
    {
        [Fact]
        public async Task CriarAgendamento_ModeloInvalido_RetornaBadRequest()
        {
            // Arrange
            var mockRepo = new Mock<IAgendamentoRepository>();
            var controller = new AgendaController(mockRepo.Object);
            controller.ModelState.AddModelError("MedicoID", "Required");

            var consultaDto = new ConsultaCreateDto
            {
                MedicoID = Guid.Empty,  
                PacienteID = Guid.NewGuid(),
                DataHoraInicio = DateTime.Now,
                DataHoraFim = DateTime.Now.AddHours(1),
                Status = "Pendente"
            };

            // Act
            var result = await controller.CriarAgendamento(consultaDto);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.IsType<SerializableError>(badRequestResult.Value);
        }

        [Fact]
        public async Task CriarAgendamento_CriacaoComSucesso_RetornaCreatedAtAction()
        {
            // Arrange
            var mockRepo = new Mock<IAgendamentoRepository>();
            var consulta = new Consulta
            {
                ID = Guid.NewGuid(),
                MedicoID = Guid.NewGuid(),
                PacienteID = Guid.NewGuid(),
                DataHoraInicio = DateTime.Now,
                DataHoraFim = DateTime.Now.AddHours(1),
                Status = "Pendente"
            };

            mockRepo.Setup(repo => repo.CriarAgendamentoAsync(It.IsAny<Consulta>()))
                    .ReturnsAsync(consulta);

            var controller = new AgendaController(mockRepo.Object);

            var consultaDto = new ConsultaCreateDto
            {
                MedicoID = consulta.MedicoID,
                PacienteID = consulta.PacienteID,
                DataHoraInicio = consulta.DataHoraInicio,
                DataHoraFim = consulta.DataHoraFim.Value, 
                Status = consulta.Status
            };

            // Act
            var result = await controller.CriarAgendamento(consultaDto);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(nameof(controller.CriarAgendamento), createdAtActionResult.ActionName);
            Assert.Equal(consulta.ID, ((Consulta)createdAtActionResult.Value).ID);
        }

        [Fact]
        public async Task CriarAgendamento_ExcecaoAoCriarAgendamento_RetornaStatusCode500()
        {
            // Arrange
            var mockRepo = new Mock<IAgendamentoRepository>();
            mockRepo.Setup(repo => repo.CriarAgendamentoAsync(It.IsAny<Consulta>()))
                    .ThrowsAsync(new Exception("Simulated exception"));

            var controller = new AgendaController(mockRepo.Object);

            var consultaDto = new ConsultaCreateDto
            {
                MedicoID = Guid.NewGuid(),
                PacienteID = Guid.NewGuid(),
                DataHoraInicio = DateTime.Now,
                DataHoraFim = DateTime.Now.AddHours(1),
                Status = "Pendente"
            };

            // Act
            var result = await controller.CriarAgendamento(consultaDto);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Erro ao criar agendamento: Simulated exception", statusCodeResult.Value);
        }
    }
}

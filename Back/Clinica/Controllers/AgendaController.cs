using Clinica.Dominio.DTOs;
using Clinica.Dominio.Entidades;
using Clinica.Infra.Interface;
using Clinica.Infra.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Clinica.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendaController : ControllerBase
    {
        private readonly IAgendamentoRepository _agendamentoRepository;

        public AgendaController(IAgendamentoRepository agendamentoRepository)
        {
            _agendamentoRepository = agendamentoRepository;
        }

        [HttpGet("consultas")]
        public async Task<ActionResult<List<Consulta>>> GetConsultasAsync(
           [FromQuery] Guid? medicoID = null,
           [FromQuery] string telefonePaciente = null,
           [FromQuery] string status = null,
           [FromQuery] DateTime? dataHoraInicio = null, 
           [FromQuery] int page = 1,
           [FromQuery] int pageSize = 10)
        {
            try
            {
                var consultasTask = _agendamentoRepository.GetAllScheduleAsync(medicoID, telefonePaciente, status);

                var consultas = await consultasTask;

                var query = consultas.AsQueryable(); 

                if (dataHoraInicio.HasValue)
                {
                    query = query.Where(c => c.DataHoraInicio >= dataHoraInicio.Value);
                }

                query = query.OrderByDescending(c => c.DataHoraInicio);

                int skip = (page - 1) * pageSize;

                var consultasPaginadas = query.Skip(skip).Take(pageSize).ToList();

                int totalConsultas = query.Count();

                int totalPages = (int)Math.Ceiling(totalConsultas / (double)pageSize);

                Response.Headers.Add("X-Total-Count", totalConsultas.ToString());
                Response.Headers.Add("X-Total-Pages", totalPages.ToString());

                return Ok(consultasPaginadas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao buscar consultas: {ex.Message}");
            }
        }

        [HttpGet("consulta/{id}")]
        public async Task<ActionResult<Consulta>> GetConsultaByIdAsync(Guid id)
        {
            try
            {
                var consulta = await _agendamentoRepository.GetScheduleAsync(id);
                if (consulta == null)
                {
                    return NotFound("Consulta não encontrada.");
                }
                return Ok(consulta);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao buscar a consulta: {ex.Message}");
            }
        }

        [HttpPost("agendamentos")]
        public async Task<IActionResult> CriarAgendamento([FromBody] ConsultaCreateDto consultaDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var consulta = new Consulta
                {
                    MedicoID = consultaDto.MedicoID,
                    PacienteID = consultaDto.PacienteID,
                    DataHoraInicio = consultaDto.DataHoraInicio,
                    DataHoraFim = consultaDto.DataHoraFim,
                    Status = consultaDto.Status
                };

                var result = await _agendamentoRepository.CriarAgendamentoAsync(consulta);
                return CreatedAtAction(nameof(CriarAgendamento), new { id = result.ID }, result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao criar agendamento: {ex.Message}");
            }
        }
        
        [HttpPut("agendamentos")]
        public async Task<IActionResult> AlterarAgendamento([FromBody] Consulta consulta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _agendamentoRepository.AlterarAgendamentoAsync(consulta);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao alterar agendamento: {ex.Message}");
            }
        }

        [HttpPut("cancelar")]
        public async Task<IActionResult> CancelarConsulta([FromBody] Guid consultaId)
        {
            try
            {
                var result = await _agendamentoRepository.AlterarStatusAgendamentoAsync(consultaId, "Cancelado");
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao cancelar consulta: {ex.Message}");
            }
        }

        [HttpDelete("agendamentos/{id}")]
        public async Task<IActionResult> InativarAgendamento(Guid id)
        {
            try
            {
                var result = await _agendamentoRepository.InativarAgendamentoAsync(id);
                if (!result)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao inativar agendamento: {ex.Message}");
            }
        }

        [HttpPut("StatusDaConsulta")]
        public async Task<IActionResult> AtualizarStatusConsulta([FromQuery] string consultaId, [FromQuery] string novoStatus)
        {
            try
            {
                if (!Guid.TryParse(consultaId, out Guid id))
                {
                    return BadRequest("ConsultaId inválido");
                }

                var result = await _agendamentoRepository.AlterarStatusAgendamentoAsync(id, novoStatus);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao cancelar consulta: {ex.Message}");
            }
        }

        [HttpGet("consultas-por-especialidade")]
        public async Task<ActionResult<IEnumerable<ConsultaPorEspecialidadeDto>>> GetConsultasPorEspecialidade()
        {
            var consultasPorEspecialidade = await _agendamentoRepository.GetConsultasPorEspecialidade();

            return Ok(consultasPorEspecialidade);
        }

        [HttpGet("consultas-por-medico")]
        public async Task<ActionResult<IEnumerable<MedicoConsultasDto>>> GetConsultasPorMedico()
        {
            var consultasPorMedico = await _agendamentoRepository.GetConsultasPorMedico();
            return Ok(consultasPorMedico);
        }

    }
}

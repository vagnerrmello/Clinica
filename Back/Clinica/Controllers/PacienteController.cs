using Clinica.Dominio.Entidades;
using Clinica.Infra.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Clinica.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacienteController : ControllerBase
    {
        private readonly IPacienteRepository _pacienteRepository;

        public PacienteController(IPacienteRepository pacienteRepository)
        {
            _pacienteRepository = pacienteRepository;
        }

        [HttpGet("pacientes")]
        public async Task<ActionResult<IEnumerable<Paciente>>> GetPacientes()
        {
            var pacientes = await _pacienteRepository.GetPacientes();
            return Ok(pacientes);
        }

        [HttpPost("criar")]
        public async Task<ActionResult<Paciente>> CreatePaciente([FromBody] Paciente paciente)
        {
            var createdPaciente = await _pacienteRepository.CreatePaciente(paciente);
            return CreatedAtAction(nameof(GetPacientes), new { id = createdPaciente.ID }, createdPaciente);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Paciente>> GetPaciente(Guid id)
        {
            var paciente = await _pacienteRepository.GetPacienteById(id);
            if (paciente == null)
            {
                return NotFound();
            }
            return Ok(paciente);
        }

        [HttpPut("atualizar")]
        public async Task<ActionResult<Paciente>> UpdatePaciente([FromBody] Paciente paciente)
        {
            var updatedPaciente = await _pacienteRepository.UpdatePaciente(paciente);
            return Ok(updatedPaciente);
        }
    }
}

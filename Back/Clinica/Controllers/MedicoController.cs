using Clinica.Dominio.Entidades;
using Microsoft.AspNetCore.Mvc;
using Clinica.Infra.Interface;


namespace Clinica.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicoController : ControllerBase
    {
        private readonly IMedicoRepository _medicoRepository;

        public MedicoController(IMedicoRepository medicoRepository)
        {
            _medicoRepository = medicoRepository;
        }

        [HttpGet("medicos")]
        public async Task<ActionResult<IEnumerable<Medico>>> GetMedicos()
        {
            var medicos = await _medicoRepository.GetMedicos();
            return Ok(medicos);
        }

        [HttpPost("criar")]
        public async Task<ActionResult<Medico>> CreateMedico([FromBody] Medico medico)
        {
            if (medico == null)
            {
                return BadRequest("Dados inválidos para criação de médico.");
            }

            var newMedico = await _medicoRepository.CreateMedico(medico);
            return CreatedAtAction(nameof(GetMedicos), new { id = newMedico.MedicoID }, newMedico);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Medico>> GetMedico(Guid id)
        {
            var medico = await _medicoRepository.GetMedicoById(id);
            if (medico == null)
            {
                return NotFound();
            }
            return Ok(medico);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Medico>> UpdateMedico(Guid id, Medico medico)
        {
            if (id != medico.MedicoID)
            {
                return BadRequest("IDs do médico não correspondem.");
            }

            var updatedMedico = await _medicoRepository.UpdateMedico(medico);
            return Ok(updatedMedico);
        }

    }
}

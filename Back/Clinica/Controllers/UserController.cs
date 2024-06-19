using Clinica.Dominio.Entidades;
using Clinica.Infra.Interface;
using Microsoft.AspNetCore.Mvc;


namespace Clinica.Web.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IMedicoRepository _medicoRepository;

        public UserController(IUsuarioRepository usuarioRepository, IMedicoRepository medicoRepository)
        {
            _usuarioRepository = usuarioRepository ?? throw new ArgumentNullException(nameof(usuarioRepository));
            _medicoRepository = medicoRepository ?? throw new ArgumentNullException(nameof(medicoRepository));
        }

        [HttpGet("{usuarioId}")]
        public async Task<ActionResult<Usuario>> GetUsuario(Guid usuarioId)
        {
            var usuario = await _usuarioRepository.GetByIdAsync(usuarioId);

            if (usuario == null)
            {
                return NotFound(); 
            }

            return Ok(usuario); 
        }

        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> GetAllAsync()
        {
            var usuarios = await _usuarioRepository.GetAllAsync();
            return Ok(usuarios);
        }

        [HttpGet("usuarios")]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            var usuarios = await _usuarioRepository.GetUsuarios();
            return Ok(usuarios);
        }

        [HttpPost]
        public async Task<ActionResult> AddAsync([FromBody] Usuario usuario)
        {
            await _usuarioRepository.AddAsync(usuario);
            return CreatedAtAction(nameof(GetUsuario), new { usuarioId = usuario.ID }, usuario);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(Guid id, [FromBody] Usuario usuario)
        {
            try
            {
                if (id != usuario.ID)
                {
                    return BadRequest("IDs de usuário não correspondem.");
                }

                await _usuarioRepository.UpdateAsync(usuario);
                return Ok(usuario); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao atualizar usuário: {ex.Message}");
            }
        }


        [HttpGet("medicos")]
        public async Task<ActionResult<List<Medico>>> GetMedicos()
        {
            try
            {
                var medicos = await _usuarioRepository.GetAllMedicAsync();
                return Ok(medicos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao buscar médicos: {ex.Message}");
            }
        }

        [HttpGet("pacientes")]
        public async Task<ActionResult<List<Paciente>>> GetPacientes()
        {
            try
            {
                var pacientes = await _usuarioRepository.GetAllPatientsAsync();
                return Ok(pacientes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao buscar pacientes: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginRequest loginRequest)
        {
            if(loginRequest.isMedico) 
            {
                var medico = await _medicoRepository.ValidarMedico(loginRequest.Email, loginRequest.Senha);

                if (medico == null)
                {
                    return BadRequest("Dados não conferem. Por gentileza revisar seus dados.");
                }

                return Ok(new { redirectUrl = "/consultasmedico", usuario = new Usuario { Nome = medico.Nome, Email = medico.Email, Senha = medico.Senha, ID = medico.MedicoID } });
            }

            var usuario = await _usuarioRepository.ValidarUsuario(loginRequest.Email, loginRequest.Senha);
            if (usuario == null)
            {
                return BadRequest("Dados não conferem. Por gentileza revisar seus dados.");
            }

            return Ok(new { redirectUrl = "/welcome", usuario });
        }

    }

}

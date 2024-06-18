using Clinica.Dominio.Entidades;
using Clinica.Infra;
using Clinica.Infra.Interface;
using Clinica.Infra.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Clinica.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PerfilController : ControllerBase
    {
        private readonly IPerfilRepository _perfilRepository;

        public PerfilController(IPerfilRepository perfilRepository)
        {
            _perfilRepository = perfilRepository;
        }

        [HttpGet("perfis")]
        public async Task<ActionResult<IEnumerable<Perfil>>> GetPerfis()
        {
            var perfis = await _perfilRepository.GetPerfis();
            return Ok(perfis);
        }
    }
}

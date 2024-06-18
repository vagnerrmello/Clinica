using Clinica.Dominio.Entidades;

namespace Clinica.Infra.Interface
{
    public interface IUsuarioRepository
    {
        Task<List<Usuario>> GetUsuarios();
        Task<Usuario> GetByIdAsync(Guid usuarioId);
        Task<List<Usuario>> GetAllAsync();
        Task AddAsync(Usuario usuario);
        Task<Usuario> ValidarUsuario(string email, string senha);
        Task<List<Medico>> GetAllMedicAsync();
        Task<List<Paciente>> GetAllPatientsAsync();
        Task UpdateAsync(Usuario usuario);
    }
}

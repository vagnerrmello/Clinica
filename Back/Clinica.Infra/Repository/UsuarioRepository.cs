using Clinica.Dominio.Entidades;
using Clinica.Infra.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Infra.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly ClinicaDbContext _dbContext;

        public UsuarioRepository(ClinicaDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }


        public async Task<List<Usuario>> GetUsuarios()
        {
            return await _dbContext.Usuarios.Include(u => u.Perfil).ToListAsync();
        }

        public async Task<Usuario> GetByIdAsync(Guid id)
        {
            try
            {
                return await _dbContext.Usuarios.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Erro ao buscar usuário por ID.", ex);
            }
        }

        public async Task<List<Usuario>> GetAllAsync()
        {
            try
            {
                return await _dbContext.Usuarios.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Erro ao buscar todos os usuários.", ex);
            }
        }

        public async Task AddAsync(Usuario usuario)
        {
            try
            {
                var perfilExistente = await _dbContext.Perfis.FindAsync(usuario.PerfilID);

                if (perfilExistente == null)
                {
                    throw new ArgumentException($"Perfil com ID {usuario.PerfilID} não encontrado.");
                }

                usuario.Perfil = perfilExistente;

                _dbContext.Usuarios.Add(usuario);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Erro ao adicionar usuário.", ex);
            }
        }

        public async Task UpdateAsync(Usuario usuario)
        {
            try
            {
                _dbContext.Entry(usuario).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Erro ao atualizar usuário.", ex);
            }
        }

        public async Task DeleteAsync(Guid id)
        {
            try
            {
                var usuario = await GetByIdAsync(id);
                if (usuario != null)
                {
                    _dbContext.Usuarios.Remove(usuario);
                    await _dbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Erro ao excluir usuário.", ex);
            }
        }

        public async Task<Usuario> ValidarUsuario(string email, string senha)
        {
            return await _dbContext.Usuarios
                .Include(u => u.Perfil)
                .FirstOrDefaultAsync(u => u.Email == email && u.Senha == senha);
        }

        public async Task<List<Medico>> GetAllMedicAsync()
        {
            try
            {
                return await _dbContext.Medicos.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Erro ao buscar todos os médicos.", ex);
            }
        }

        public async Task<List<Paciente>> GetAllPatientsAsync()
        {
            try
            {
                return await _dbContext.Pacientes.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Erro ao buscar todos os pacientes.", ex);
            }
        }

    }
}

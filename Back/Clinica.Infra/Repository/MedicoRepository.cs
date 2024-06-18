using Clinica.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Clinica.Infra.Interface;

namespace Clinica.Infra.Repository
{
    public class MedicoRepository : IMedicoRepository
    {
        private readonly ClinicaDbContext _dbContext;

        public MedicoRepository(ClinicaDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<IEnumerable<Medico>> GetMedicos()
        {
            return await _dbContext.Medicos.ToListAsync();
        }

        public async Task<Medico> CreateMedico(Medico medico)
        {
            _dbContext.Medicos.Add(medico);
            await _dbContext.SaveChangesAsync();
            return medico;
        }

        public async Task<Medico> GetMedicoById(Guid id)
        {
            return await _dbContext.Medicos.FindAsync(id);
        }

        public async Task<Medico> UpdateMedico(Medico medico)
        {
            try
            {
                _dbContext.Entry(medico).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return medico;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Medico> ValidarMedico(string email, string senha)
        {
            return await _dbContext.Medicos
                .FirstOrDefaultAsync(u => u.Email == email && u.Senha == senha);
        }
    }
}

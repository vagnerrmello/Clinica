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
    public class PacienteRepository : IPacienteRepository
    {
        private readonly ClinicaDbContext _dbContext;

        public PacienteRepository(ClinicaDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<IEnumerable<Paciente>> GetPacientes()
        {
            return await _dbContext.Pacientes.ToListAsync();
        }

        public async Task<Paciente> CreatePaciente(Paciente paciente)
        {
            _dbContext.Pacientes.Add(paciente);
            await _dbContext.SaveChangesAsync();
            return paciente;
        }

        public async Task<Paciente> GetPacienteById(Guid id)
        {
            return await _dbContext.Pacientes.FindAsync(id);
        }

        public async Task<Paciente> UpdatePaciente(Paciente paciente)
        {
            _dbContext.Entry(paciente).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return paciente;
        }
    }
}

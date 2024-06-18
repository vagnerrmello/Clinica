using Clinica.Dominio.Entidades;
using Clinica.Infra.Interface;
using Microsoft.EntityFrameworkCore;
using System;



namespace Clinica.Infra.Repository
{

    public class PerfilRepository : IPerfilRepository
    {
        private readonly ClinicaDbContext _dbContext;

        public PerfilRepository(ClinicaDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<IEnumerable<Perfil>> GetPerfis()
        {
            return await _dbContext.Perfis.ToListAsync();
        }
    }
}

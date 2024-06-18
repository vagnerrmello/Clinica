using Clinica.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

    namespace Clinica.Infra.Interface
{
        public interface IMedicoRepository
        {
            Task<IEnumerable<Medico>> GetMedicos();
            Task<Medico> CreateMedico(Medico medico);
            Task<Medico> UpdateMedico(Medico medico);
            Task<Medico> GetMedicoById(Guid id);
            Task<Medico> ValidarMedico(string email, string senha);
        }
    }


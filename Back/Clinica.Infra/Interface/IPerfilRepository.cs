using Clinica.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Infra.Interface
{
    public interface IPerfilRepository
    {
        Task<IEnumerable<Perfil>> GetPerfis();
    }
}

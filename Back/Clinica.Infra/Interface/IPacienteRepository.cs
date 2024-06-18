using Clinica.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Infra.Interface
{
    public interface IPacienteRepository
    {
        Task<IEnumerable<Paciente>> GetPacientes();
        Task<Paciente> CreatePaciente(Paciente paciente);
        Task<Paciente> GetPacienteById(Guid id);
        Task<Paciente> UpdatePaciente(Paciente paciente);
    }
}

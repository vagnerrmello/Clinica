using Clinica.Dominio.DTOs;
using Clinica.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Infra.Interface
{
    public interface IAgendamentoRepository
    {
        Task<Consulta> CriarAgendamentoAsync(Consulta consulta);
        Task<Consulta> AlterarAgendamentoAsync(Consulta consulta);
        Task<bool> InativarAgendamentoAsync(Guid consultaId);
        Task<List<Consulta>> GetAllScheduleAsync(Guid? medicoID = null, string telefonePaciente = null, string status = null);
        Task<Consulta> AlterarStatusAgendamentoAsync(Guid? consultaID, string status);
        Task<Consulta> AlterarAgendamentoMedicoAsync(Consulta consulta);
        Task<Consulta> GetScheduleAsync(Guid ID);
        Task<IEnumerable<ConsultaPorEspecialidadeDto>> GetConsultasPorEspecialidade();
        Task<IEnumerable<MedicoConsultasDto>> GetConsultasPorMedico();
    }
}

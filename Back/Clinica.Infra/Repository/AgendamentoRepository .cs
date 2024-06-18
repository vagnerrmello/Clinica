using Clinica.Dominio.DTOs;
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
    public class AgendamentoRepository : IAgendamentoRepository
    {
        private readonly ClinicaDbContext _context;

        public AgendamentoRepository(ClinicaDbContext context)
        {
            _context = context;
        }

        public async Task<List<Consulta>> GetAllScheduleAsync(Guid? medicoID = null, string telefonePaciente = null, string status = null)
        {
            try
            {
                var query = _context.Consultas.AsQueryable();
                query = query.Include(c => c.Medico);
                query = query.Include(c => c.Paciente);

                if (medicoID.HasValue)
                {
                    query = query.Where(c => c.MedicoID == medicoID.Value);
                }

                if (!string.IsNullOrWhiteSpace(telefonePaciente))
                {
                    query = query.Where(c => c.Paciente.Telefone.Contains(telefonePaciente));
                }

                if (!string.IsNullOrWhiteSpace(status))
                {
                    query = query.Where(c => c.Status == status);
                }

                return await query.ToListAsync(); // Executa a consulta e retorna a lista
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Erro ao buscar todas as consultas.", ex);
            }
        }

        public async Task<Consulta> GetScheduleAsync(Guid ID)
        {
            try
            {
                var query = await _context.Consultas
                                          .Include(c => c.Medico)
                                          .Include(c => c.Paciente)
                                          .SingleOrDefaultAsync(c => c.ID == ID);

                return query;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Erro ao buscar a consulta.", ex);
            }
        }

        public async Task<Consulta> CriarAgendamentoAsync(Consulta consulta)
        {
            consulta.DataHoraFim = null;
            _context.Consultas.Add(consulta);
            await _context.SaveChangesAsync();
            return consulta;
        }

        public async Task<Consulta> AlterarAgendamentoAsync(Consulta consulta)
        {
            var existingConsulta = await _context.Consultas.FindAsync(consulta.ID);
            if (existingConsulta == null)
            {
                throw new ArgumentException("Consulta não encontrada.");
            }

            existingConsulta.MedicoID = consulta.MedicoID;
            existingConsulta.PacienteID = consulta.PacienteID;
            existingConsulta.DataHoraInicio = consulta.DataHoraInicio;
            //existingConsulta.DataHoraFim = consulta.DataHoraFim;
            //existingConsulta.Status = consulta.Status;

            _context.Consultas.Update(existingConsulta);
            await _context.SaveChangesAsync();
            return existingConsulta;
        }

        public async Task<Consulta> AlterarAgendamentoMedicoAsync(Consulta consulta)
        {
            var existingConsulta = await _context.Consultas.FindAsync(consulta.ID);
            if (existingConsulta == null)
            {
                throw new ArgumentException("Consulta não encontrada.");
            }

            existingConsulta.MedicoID = consulta.MedicoID;
            existingConsulta.PacienteID = consulta.PacienteID;
            existingConsulta.DataHoraInicio = consulta.DataHoraInicio;
            existingConsulta.DataHoraFim = consulta.DataHoraFim;
            existingConsulta.Status = consulta.Status;

            _context.Consultas.Update(existingConsulta);
            await _context.SaveChangesAsync();
            return existingConsulta;
        }

        public async Task<Consulta> AlterarStatusAgendamentoAsync(Guid? consultaID, string status)
        {
            var existingConsulta = await _context.Consultas.FindAsync(consultaID);
            if (existingConsulta == null)
            {
                throw new ArgumentException("Consulta não encontrada.");
            }

            if (status.Equals("Concluída"))
                existingConsulta.DataHoraFim = DateTime.Now;

            existingConsulta.Status = status;

            _context.Consultas.Update(existingConsulta);
            await _context.SaveChangesAsync();
            return existingConsulta;
        }

        public async Task<bool> InativarAgendamentoAsync(Guid consultaId)
        {
            var consulta = await _context.Consultas.FindAsync(consultaId);
            if (consulta == null)
            {
                return false;
            }

            _context.Consultas.Remove(consulta);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ConsultaPorEspecialidadeDto>> GetConsultasPorEspecialidade()
        {
            var consultasPorEspecialidade = await _context.Consultas
                .Join(_context.Medicos,
                      consulta => consulta.MedicoID,
                      medico => medico.MedicoID,
                      (consulta, medico) => new { consulta, medico })
                .GroupBy(cm => cm.medico.Especialidade)
                .Select(g => new ConsultaPorEspecialidadeDto
                {
                    Especialidade = g.Key,
                    TotalConsultas = g.Count()
                })
                .ToListAsync();

            return consultasPorEspecialidade;
        }

        public async Task<IEnumerable<MedicoConsultasDto>> GetConsultasPorMedico()
        {
            var consultasPorMedico = await _context.Medicos
                .GroupJoin(_context.Consultas,
                           medico => medico.MedicoID,
                           consulta => consulta.MedicoID,
                           (medico, consultas) => new { medico, consultas })
                .SelectMany(m => m.consultas.DefaultIfEmpty(),
                            (m, consulta) => new { m.medico.Nome, ConsultaID = consulta != null ? consulta.ID : (Guid?)null })
                .GroupBy(mc => mc.Nome)
                .Select(g => new MedicoConsultasDto
                {
                    Nome = g.Key,
                    TotalConsultas = g.Count(c => c.ConsultaID.HasValue)
                })
                .OrderBy(mc => mc.Nome)
                .ToListAsync();

            return consultasPorMedico;
        }



    }
}

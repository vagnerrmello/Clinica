using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Dominio.DTOs
{
    public class ConsultaCreateDto
    {
        public Guid MedicoID { get; set; }
        public Guid PacienteID { get; set; }
        public DateTime DataHoraInicio { get; set; }
        public DateTime DataHoraFim { get; set; }
        public string Status { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Dominio.Entidades
{
    public class Consulta
    {
        public Guid ID { get; set; }
        public Guid MedicoID { get; set; } // Chave estrangeira
        public Guid PacienteID { get; set; } // Chave estrangeira
        public DateTime DataHoraInicio { get; set; }
        public DateTime? DataHoraFim { get; set; }
        public string Status { get; set; }

        public Medico Medico { get; set; } // Propriedade de navegação para o médico
        public Paciente Paciente { get; set; } // Propriedade de navegação para o paciente
    }

}

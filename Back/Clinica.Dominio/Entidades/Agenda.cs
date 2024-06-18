using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Dominio.Entidades
{
    public class Agenda
    {
        public Guid ID { get; set; }
        public Guid MedicoID { get; set; } // Chave estrangeira
        public DateTime Data { get; set; }

        public Medico Medico { get; set; } // Propriedade de navegação para o médico
    }

}

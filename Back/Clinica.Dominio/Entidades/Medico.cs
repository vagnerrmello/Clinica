using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Dominio.Entidades
{
    public class Medico
    {
        public Guid MedicoID { get; set; } 
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Especialidade { get; set; } = string.Empty;

        //List<Agenda> agenda { get; set; } = new List<Agenda>();
        //List<Consulta> consulta { get; set; } = new List<Consulta>();
    }
}

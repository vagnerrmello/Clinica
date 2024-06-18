using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Dominio.Entidades
{
    public class Perfil
    {
        public Guid PerfilID { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
    }

}

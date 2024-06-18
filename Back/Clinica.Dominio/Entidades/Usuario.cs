using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Dominio.Entidades
{
    public class Usuario
    {
        public Guid ID { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public Guid PerfilID { get; set; } // Chave estrangeira

        public Perfil Perfil { get; set; } // Propriedade de navegação para o perfil
    }
}

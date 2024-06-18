using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Dominio.Entidades
{
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Senha { get; set; }
        public bool isMedico { get; set; }
    }
}

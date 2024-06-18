using Clinica.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;


namespace Clinica.Infra
{
    public class ClinicaDbContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Perfil> Perfis { get; set; }
        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<Consulta> Consultas { get; set; }
        public DbSet<Agenda> Agendas { get; set; }
        public DbSet<Medico> Medicos { get; set; }

        public ClinicaDbContext(DbContextOptions<ClinicaDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurações adicionais, como chaves primárias compostas, índices, etc., podem ser definidas aqui.

            // Relacionamento entre Usuario e Perfil
            modelBuilder.Entity<Usuario>()
                .HasOne(u => u.Perfil)
                .WithMany()
                .HasForeignKey(u => u.PerfilID)
                .OnDelete(DeleteBehavior.Restrict); // Pode ser .Cascade se quiser que a exclusão de um perfil remova os usuários associados

            modelBuilder.Entity<Medico>()
                .HasKey(m => m.MedicoID); // Definindo MedicoID como chave primária

            // Relacionamentos entre Consulta, Paciente e Médico
            modelBuilder.Entity<Consulta>()
                .HasOne(c => c.Medico)
                .WithMany()
                .HasForeignKey(c => c.MedicoID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Consulta>()
                .HasOne(c => c.Paciente)
                .WithMany()
                .HasForeignKey(c => c.PacienteID)
                .OnDelete(DeleteBehavior.Restrict);

            // Relacionamento entre Agenda e Médico
            modelBuilder.Entity<Agenda>()
                .HasOne(a => a.Medico)
                .WithMany()
                .HasForeignKey(a => a.MedicoID)
                .OnDelete(DeleteBehavior.Restrict);


        }
    }
}

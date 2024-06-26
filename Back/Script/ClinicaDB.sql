USE [master]
GO
/****** Object:  Database [ClinicaDb]    Script Date: 19/06/2024 08:27:51 ******/
CREATE DATABASE [ClinicaDb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ClinicaDb', FILENAME = N'/var/opt/mssql/data/ClinicaDb.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ClinicaDb_log', FILENAME = N'/var/opt/mssql/data/ClinicaDb_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ClinicaDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ClinicaDb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ClinicaDb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ClinicaDb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ClinicaDb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ClinicaDb] SET ARITHABORT OFF 
GO
ALTER DATABASE [ClinicaDb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ClinicaDb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ClinicaDb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ClinicaDb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ClinicaDb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ClinicaDb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ClinicaDb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ClinicaDb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ClinicaDb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ClinicaDb] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ClinicaDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ClinicaDb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ClinicaDb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ClinicaDb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ClinicaDb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ClinicaDb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ClinicaDb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ClinicaDb] SET RECOVERY FULL 
GO
ALTER DATABASE [ClinicaDb] SET  MULTI_USER 
GO
ALTER DATABASE [ClinicaDb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ClinicaDb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ClinicaDb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ClinicaDb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ClinicaDb] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ClinicaDb] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'ClinicaDb', N'ON'
GO
ALTER DATABASE [ClinicaDb] SET QUERY_STORE = ON
GO
ALTER DATABASE [ClinicaDb] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [ClinicaDb]
GO
/****** Object:  Table [dbo].[Agendas]    Script Date: 19/06/2024 08:27:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Agendas](
	[ID] [uniqueidentifier] NOT NULL,
	[MedicoID] [uniqueidentifier] NOT NULL,
	[Data] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Consultas]    Script Date: 19/06/2024 08:27:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Consultas](
	[ID] [uniqueidentifier] NOT NULL,
	[MedicoID] [uniqueidentifier] NOT NULL,
	[PacienteID] [uniqueidentifier] NOT NULL,
	[DataHoraInicio] [datetime] NOT NULL,
	[DataHoraFim] [datetime] NULL,
	[Status] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Medicos]    Script Date: 19/06/2024 08:27:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicos](
	[MedicoID] [uniqueidentifier] NOT NULL,
	[Nome] [nvarchar](100) NOT NULL,
	[Especialidade] [nvarchar](100) NULL,
	[Email] [nvarchar](100) NULL,
	[Senha] [nvarchar](100) NULL,
 CONSTRAINT [PK__Medicos__5953C276DE36F292] PRIMARY KEY CLUSTERED 
(
	[MedicoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pacientes]    Script Date: 19/06/2024 08:27:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pacientes](
	[ID] [uniqueidentifier] NOT NULL,
	[Nome] [nvarchar](100) NOT NULL,
	[DataNascimento] [date] NOT NULL,
	[Telefone] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Perfis]    Script Date: 19/06/2024 08:27:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Perfis](
	[PerfilID] [uniqueidentifier] NOT NULL,
	[Nome] [nvarchar](100) NOT NULL,
	[Descricao] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[PerfilID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 19/06/2024 08:27:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[ID] [uniqueidentifier] NOT NULL,
	[Nome] [nvarchar](100) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Senha] [nvarchar](100) NOT NULL,
	[PerfilID] [uniqueidentifier] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Consultas] ([ID], [MedicoID], [PacienteID], [DataHoraInicio], [DataHoraFim], [Status]) VALUES (N'408b4a0d-a986-4a02-09c7-08dc8d727131', N'356f5685-517d-4403-b103-00079117eba8', N'0925a2c4-bc7b-4ce6-8734-15778a0dcdd8', CAST(N'2024-06-15T19:33:46.610' AS DateTime), CAST(N'2024-06-18T00:25:01.353' AS DateTime), N'Pendente')
INSERT [dbo].[Consultas] ([ID], [MedicoID], [PacienteID], [DataHoraInicio], [DataHoraFim], [Status]) VALUES (N'f3f2d971-14b5-4ac6-26c7-08dc8d7c96a6', N'356f5685-517d-4403-b103-00079117eba8', N'8080e919-2459-4550-bcf6-a6521de93e46', CAST(N'2024-06-20T17:48:00.000' AS DateTime), CAST(N'2024-06-15T17:48:00.000' AS DateTime), N'Pendente')
INSERT [dbo].[Consultas] ([ID], [MedicoID], [PacienteID], [DataHoraInicio], [DataHoraFim], [Status]) VALUES (N'90fe44fc-bb45-412b-5ce3-08dc8d7f07e5', N'ba66f6a3-77f7-416b-b461-3e20882d0478', N'a2b18a18-2e53-465d-99aa-a8e7ede07691', CAST(N'2024-06-15T18:06:00.000' AS DateTime), NULL, N'Pendente')
INSERT [dbo].[Consultas] ([ID], [MedicoID], [PacienteID], [DataHoraInicio], [DataHoraFim], [Status]) VALUES (N'db314e00-7a90-4d07-99e3-08dc8e1bf228', N'32465708-6e51-4cab-9b63-8844628d62e9', N'0925a2c4-bc7b-4ce6-8734-15778a0dcdd8', CAST(N'2024-06-16T08:00:00.000' AS DateTime), NULL, N'Pendente')
INSERT [dbo].[Consultas] ([ID], [MedicoID], [PacienteID], [DataHoraInicio], [DataHoraFim], [Status]) VALUES (N'7bc6a8ca-b58f-44e5-99e4-08dc8e1bf228', N'32465708-6e51-4cab-9b63-8844628d62e9', N'8080e919-2459-4550-bcf6-a6521de93e46', CAST(N'2024-06-18T15:00:00.000' AS DateTime), CAST(N'2024-06-17T22:37:08.330' AS DateTime), N'Pendente')
INSERT [dbo].[Consultas] ([ID], [MedicoID], [PacienteID], [DataHoraInicio], [DataHoraFim], [Status]) VALUES (N'ab739064-8b42-40fa-e34c-08dc8f28c2be', N'33814ab5-a163-43fa-7b88-08dc8ed9ad7f', N'a2b18a18-2e53-465d-99aa-a8e7ede07691', CAST(N'2024-06-18T15:30:00.000' AS DateTime), CAST(N'2024-06-17T22:11:12.387' AS DateTime), N'Pendente')
INSERT [dbo].[Consultas] ([ID], [MedicoID], [PacienteID], [DataHoraInicio], [DataHoraFim], [Status]) VALUES (N'f53513e4-f188-4fe5-9ad2-08dc8f414ca0', N'356f5685-517d-4403-b103-00079117eba8', N'0925a2c4-bc7b-4ce6-8734-15778a0dcdd8', CAST(N'2024-06-28T12:50:00.000' AS DateTime), CAST(N'2024-06-18T13:20:45.003' AS DateTime), N'Concluída')
INSERT [dbo].[Consultas] ([ID], [MedicoID], [PacienteID], [DataHoraInicio], [DataHoraFim], [Status]) VALUES (N'60ebe3e1-7bd2-4440-9ad3-08dc8f414ca0', N'a94ba662-1939-4b29-21b9-08dc8f3a5229', N'0925a2c4-bc7b-4ce6-8734-15778a0dcdd8', CAST(N'2024-06-19T12:00:00.000' AS DateTime), NULL, N'Pendente')
INSERT [dbo].[Consultas] ([ID], [MedicoID], [PacienteID], [DataHoraInicio], [DataHoraFim], [Status]) VALUES (N'fb8d1a7c-d88a-4df0-d467-08dc8f4c0c25', N'2fb1831f-f58d-43d9-99bd-08dc8f4bed54', N'7bf13210-fb01-4a3f-54cd-08dc8ecaa1a4', CAST(N'2024-07-21T15:10:00.000' AS DateTime), NULL, N'Pendente')
INSERT [dbo].[Consultas] ([ID], [MedicoID], [PacienteID], [DataHoraInicio], [DataHoraFim], [Status]) VALUES (N'd6051d2c-cc0d-46bd-ec2a-08dc8fb25ba7', N'a94ba662-1939-4b29-21b9-08dc8f3a5229', N'c215b35f-13da-44be-7a53-08dc8fb21be7', CAST(N'2024-06-27T22:24:00.000' AS DateTime), NULL, N'Cancelado')
GO
INSERT [dbo].[Medicos] ([MedicoID], [Nome], [Especialidade], [Email], [Senha]) VALUES (N'356f5685-517d-4403-b103-00079117eba8', N'Médico DOIS ', N'Psicanalista', N'vagnerrmello@gmail.com', N'123')
INSERT [dbo].[Medicos] ([MedicoID], [Nome], [Especialidade], [Email], [Senha]) VALUES (N'33814ab5-a163-43fa-7b88-08dc8ed9ad7f', N'Roberto', N'Pele', N'vagnerrmello@gmail.com', N'1234')
INSERT [dbo].[Medicos] ([MedicoID], [Nome], [Especialidade], [Email], [Senha]) VALUES (N'0fde148f-4450-4e35-8d27-08dc8f2a6506', N'Amélia da Silva', N'Pediatra', N'vagnerrmello@gmail.com.br', N'123456789')
INSERT [dbo].[Medicos] ([MedicoID], [Nome], [Especialidade], [Email], [Senha]) VALUES (N'a94ba662-1939-4b29-21b9-08dc8f3a5229', N'Médico QUATRO', N'Psicólogo', N'quarto@quatro.com', N'12345')
INSERT [dbo].[Medicos] ([MedicoID], [Nome], [Especialidade], [Email], [Senha]) VALUES (N'e39bd0ca-edaa-4571-21ba-08dc8f3a5229', N'fasdf', N'asfd', N'vagnerrmello@gmail.com', N'asdf')
INSERT [dbo].[Medicos] ([MedicoID], [Nome], [Especialidade], [Email], [Senha]) VALUES (N'2fb1831f-f58d-43d9-99bd-08dc8f4bed54', N'DFASDASDFSA', N'Cirurgião Geral', N'vagnerrmello@gmail.com', N'1234512')
INSERT [dbo].[Medicos] ([MedicoID], [Nome], [Especialidade], [Email], [Senha]) VALUES (N'6b4b1b05-541d-4d99-3bee-08dc8f9a0230', N'asdfasfdASFDSADFFSA', N'asdfsdf', N'vagnerrmello@gmail.com', N'12345')
INSERT [dbo].[Medicos] ([MedicoID], [Nome], [Especialidade], [Email], [Senha]) VALUES (N'e2627913-cc78-440c-3bef-08dc8f9a0230', N'Medico de hoje', N'FUNCIONAL', N'hoje@hoje.com', N'12345')
INSERT [dbo].[Medicos] ([MedicoID], [Nome], [Especialidade], [Email], [Senha]) VALUES (N'ba66f6a3-77f7-416b-b461-3e20882d0478', N'Médico TRÊS', N'Pediatra', N'vagnerrmello@gmail.com', N'12345')
INSERT [dbo].[Medicos] ([MedicoID], [Nome], [Especialidade], [Email], [Senha]) VALUES (N'32465708-6e51-4cab-9b63-8844628d62e9', N'Médico um', N'Ortopedista', N'vagnerrmello@gmail.com', N'123456')
GO
INSERT [dbo].[Pacientes] ([ID], [Nome], [DataNascimento], [Telefone]) VALUES (N'7bf13210-fb01-4a3f-54cd-08dc8ecaa1a4', N'Júlio Batista', CAST(N'2000-06-20' AS Date), N'82956666666')
INSERT [dbo].[Pacientes] ([ID], [Nome], [DataNascimento], [Telefone]) VALUES (N'1696a89b-9287-458f-c7d1-08dc8f43cd46', N'tesasaaree', CAST(N'2024-06-19' AS Date), N'sdfasdf')
INSERT [dbo].[Pacientes] ([ID], [Nome], [DataNascimento], [Telefone]) VALUES (N'1d2a34d9-84a2-4e01-c7d2-08dc8f43cd46', N'teste agora', CAST(N'2024-06-20' AS Date), N'asdfasdf')
INSERT [dbo].[Pacientes] ([ID], [Nome], [DataNascimento], [Telefone]) VALUES (N'76e271a9-44c6-4559-c7d3-08dc8f43cd46', N'testetesteteste', CAST(N'2000-06-20' AS Date), N'sfdasfsf')
INSERT [dbo].[Pacientes] ([ID], [Nome], [DataNascimento], [Telefone]) VALUES (N'c215b35f-13da-44be-7a53-08dc8fb21be7', N'Paciente de hoje', CAST(N'2000-02-28' AS Date), N'82101010101')
INSERT [dbo].[Pacientes] ([ID], [Nome], [DataNascimento], [Telefone]) VALUES (N'0925a2c4-bc7b-4ce6-8734-15778a0dcdd8', N'José', CAST(N'1995-01-15' AS Date), N'82999999999')
INSERT [dbo].[Pacientes] ([ID], [Nome], [DataNascimento], [Telefone]) VALUES (N'8080e919-2459-4550-bcf6-a6521de93e46', N'João', CAST(N'1989-05-06' AS Date), N'8277777777')
INSERT [dbo].[Pacientes] ([ID], [Nome], [DataNascimento], [Telefone]) VALUES (N'a2b18a18-2e53-465d-99aa-a8e7ede07691', N'André', CAST(N'2000-03-10' AS Date), N'8288888888')
GO
INSERT [dbo].[Perfis] ([PerfilID], [Nome], [Descricao]) VALUES (N'a121e51c-6807-4520-ae15-1b352668d7a7', N'Administrador', N'Administrador Geral')
INSERT [dbo].[Perfis] ([PerfilID], [Nome], [Descricao]) VALUES (N'6a62048a-ce0b-421a-9a40-6f66546dd253', N'Atendente', N'Recepção')
GO
INSERT [dbo].[Usuarios] ([ID], [Nome], [Email], [Senha], [PerfilID]) VALUES (N'9f3fb35d-2624-4e33-b782-08dc8e5afba0', N'Manoel teste', N'monoel@gmail.com', N'12345', N'6a62048a-ce0b-421a-9a40-6f66546dd253')
INSERT [dbo].[Usuarios] ([ID], [Nome], [Email], [Senha], [PerfilID]) VALUES (N'e74b3098-98e2-4cce-243a-08dc8f38c04f', N'User tester', N'user@user.com', N'123', N'6a62048a-ce0b-421a-9a40-6f66546dd253')
INSERT [dbo].[Usuarios] ([ID], [Nome], [Email], [Senha], [PerfilID]) VALUES (N'a62c5fb5-36c9-430b-243b-08dc8f38c04f', N'sadfasfdasdffsfd', N'asdfas@asdfasdf.com', N'asdf', N'6a62048a-ce0b-421a-9a40-6f66546dd253')
INSERT [dbo].[Usuarios] ([ID], [Nome], [Email], [Senha], [PerfilID]) VALUES (N'2be5c5ee-ea2e-46df-f08f-08dc8f4bcdfd', N'asfsaSDasdASD', N'vagnerrmello12@gmail.com', N'12345', N'6a62048a-ce0b-421a-9a40-6f66546dd253')
INSERT [dbo].[Usuarios] ([ID], [Nome], [Email], [Senha], [PerfilID]) VALUES (N'c923f838-7d0a-44c1-b375-08dc8f99edb3', N'asdfas', N'vagnerrmello@gmail.com', N'123456', N'6a62048a-ce0b-421a-9a40-6f66546dd253')
INSERT [dbo].[Usuarios] ([ID], [Nome], [Email], [Senha], [PerfilID]) VALUES (N'efa442d2-8b34-494e-b376-08dc8f99edb3', N'Usuário para amanhã', N'emaiemaill@email.com', N'1233', N'6a62048a-ce0b-421a-9a40-6f66546dd253')
INSERT [dbo].[Usuarios] ([ID], [Nome], [Email], [Senha], [PerfilID]) VALUES (N'16b0d8e8-0cd6-4358-43a2-08dc8fff4f68', N'Médico NOVE', N'vagner@gmail.com', N'12345', N'6a62048a-ce0b-421a-9a40-6f66546dd253')
INSERT [dbo].[Usuarios] ([ID], [Nome], [Email], [Senha], [PerfilID]) VALUES (N'3fa85f64-5717-4562-b3fc-2c963f66afa6', N'Joregeanne', N'jorgeanne@hotmail.com', N'12345', N'6a62048a-ce0b-421a-9a40-6f66546dd253')
INSERT [dbo].[Usuarios] ([ID], [Nome], [Email], [Senha], [PerfilID]) VALUES (N'd98bb234-38e4-4829-ba44-c1a5c95e7d8c', N'Osmar Takashi', N'otaoki@findes.org.br', N'12345', N'a121e51c-6807-4520-ae15-1b352668d7a7')
INSERT [dbo].[Usuarios] ([ID], [Nome], [Email], [Senha], [PerfilID]) VALUES (N'12a35272-c129-41ac-86ae-ff6292b149ed', N'Vagner', N'vagnerrmello@gmail.com', N'12345', N'a121e51c-6807-4520-ae15-1b352668d7a7')
GO
ALTER TABLE [dbo].[Agendas] ADD  CONSTRAINT [DF_Agendas_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[Consultas] ADD  CONSTRAINT [DF_Consultas_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[Medicos] ADD  CONSTRAINT [DF_Medicos_MedicoID]  DEFAULT (newid()) FOR [MedicoID]
GO
ALTER TABLE [dbo].[Pacientes] ADD  CONSTRAINT [DF_Pacientes_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[Perfis] ADD  CONSTRAINT [DF_Perfis_PerfilID]  DEFAULT (newid()) FOR [PerfilID]
GO
ALTER TABLE [dbo].[Usuarios] ADD  CONSTRAINT [DF_Usuarios_ID]  DEFAULT (newid()) FOR [ID]
GO
ALTER TABLE [dbo].[Consultas]  WITH CHECK ADD  CONSTRAINT [FK_Consultas_Pacientes] FOREIGN KEY([PacienteID])
REFERENCES [dbo].[Pacientes] ([ID])
GO
ALTER TABLE [dbo].[Consultas] CHECK CONSTRAINT [FK_Consultas_Pacientes]
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_Perfis] FOREIGN KEY([PerfilID])
REFERENCES [dbo].[Perfis] ([PerfilID])
GO
ALTER TABLE [dbo].[Usuarios] CHECK CONSTRAINT [FK_Usuarios_Perfis]
GO
USE [master]
GO
ALTER DATABASE [ClinicaDb] SET  READ_WRITE 
GO

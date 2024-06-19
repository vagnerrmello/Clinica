using Clinica.Dominio.Entidades;
using Clinica.Infra.Interface;
using Clinica.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Xunit;

public class UserControllerTests
{
    private readonly Mock<IUsuarioRepository> _mockUsuarioRepository;
    private readonly Mock<IMedicoRepository> _mockMedicoRepository;
    private readonly UserController _controller;

    public UserControllerTests()
    {
        _mockUsuarioRepository = new Mock<IUsuarioRepository>();
        _mockMedicoRepository = new Mock<IMedicoRepository>();
        _controller = new UserController(_mockUsuarioRepository.Object, _mockMedicoRepository.Object);
    }

    [Fact]
    public async Task Login_UsuarioValido_DeveRetornarUsuario()
    {
        // Arrange
        var loginRequest = new LoginRequest
        {
            Email = "usuario@teste.com",
            Senha = "senha456",
            isMedico = false
        };

        var usuario = new Usuario
        {
            ID = Guid.NewGuid(),
            Nome = "Usuário Teste",
            Email = "usuario@teste.com",
            Senha = "senha456",
            Perfil = new Perfil { Nome = "Normal", Descricao = "Usuário normal" }
        };

        _mockUsuarioRepository.Setup(repo => repo.ValidarUsuario(loginRequest.Email, loginRequest.Senha))
                              .ReturnsAsync(usuario);

        // Act
        var result = await _controller.Login(loginRequest);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        dynamic returnValue = okResult.Value;

        Assert.Equal("/welcome", returnValue.redirectUrl);
        Assert.Equal("Usuário Teste", returnValue.usuario.Nome);
        Assert.Equal("usuario@teste.com", returnValue.usuario.Email);
        Assert.Equal(usuario.ID, returnValue.usuario.ID);
    }
}

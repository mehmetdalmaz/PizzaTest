using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaTest.Business.Abstract;
using PizzaTest.Dto.Dtos.AuthDto;

namespace PizzaTest.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public AuthController(IAuthService authService, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto registerDto)
        {
            var result = _authService.Register(registerDto);
            if (!result)
            {
                return BadRequest("Kayıt başarısız. Kullanıcı zaten mevcut olabilir.");
            }
            return Ok("Kayıt işlemi başarılı.");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            var token = _authService.Login(loginDto);
            if (token == null)
            {
                return Unauthorized("Geçersiz email veya şifre.");
            }

            return Ok(token);
        }

    }
}

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PizzaTest.Business.Abstract;
using PizzaTest.DataAccess.Context;
using PizzaTest.Dto.Dtos.AuthDto;
using PizzaTest.Entity.Concrete;

namespace PizzaTest.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthService(AppDbContext context, TokenService tokenService, IMapper mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        public bool Register(RegisterDto registerUserDto)
        {
            var exists = _context.Users.Any(u => u.Email == registerUserDto.Email);
            if (exists) return false;

            var user = _mapper.Map<User>(registerUserDto);
            _context.Users.Add(user);
            _context.SaveChanges();
            return true;
        }

        public TokenDto? Login(LoginDto loginUserDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == loginUserDto.Email);
            if (user == null || user.Password != loginUserDto.Password)
                return null;

            var token = _tokenService.CreateToken(user);
            return new TokenDto { Token = token, Expiration = DateTime.Now.AddMinutes(60) };
        }
    }
}

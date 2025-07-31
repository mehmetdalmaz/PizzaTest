using PizzaTest.Dto.Dtos.AuthDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Business.Abstract
{
    public interface IAuthService 
    {
        bool Register(RegisterDto registerUserDto);
        TokenDto? Login(LoginDto loginUserDto);
    }
}

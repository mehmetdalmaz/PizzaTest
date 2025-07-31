using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaTest.Business.Abstract;
using PizzaTest.Dto.Dtos.UserDto;

namespace PizzaTest.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var users = _userService.TGetList();
            if (users == null || !users.Any())
            {
                return NotFound("Kullanıcılar yok.");
            }
            var userDtos = _mapper.Map<List<ResultUserDto>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = _userService.TGetById(id);
            if (user == null)
            {
                return NotFound("Kullanıcı bulunamadı.");
            }
            var userDto = _mapper.Map<ResultUserDto>(user);
            return Ok(userDto);
        }
    }

    }

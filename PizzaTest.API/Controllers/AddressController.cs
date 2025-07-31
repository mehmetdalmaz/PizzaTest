using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaTest.Business.Abstract;
using PizzaTest.Dto.Dtos.AddressDto;
using PizzaTest.Dto.Dtos.ProductDto;
using PizzaTest.Entity.Concrete;

namespace PizzaTest.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _addressService;
        private readonly IMapper _mapper;

        public AddressController(IAddressService addressService, IMapper mapper)
        {
            _addressService = addressService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addresses = _addressService.TGetList();
            if (addresses == null || !addresses.Any())
            {
                return NotFound("Adresler yok.");
            }
            var addressDtos = _mapper.Map<List<ResultUserAddressDto>>(addresses);
            return Ok(addressDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var address = _addressService.TGetById(id);
            if (address == null)
            {
                return NotFound("Adres bulunamadı.");
            }
            var addressDto = _mapper.Map<ResultUserAddressDto>(address);
            return Ok(addressDto);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateUserAddressDto createUserAddressDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var address = _mapper.Map<Address>(createUserAddressDto);
            _addressService.TInsert(address);
            return Ok("Adres başarıyla eklendi.");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateUserAddressDto updateUserAddressDto)
        {
            if (id != updateUserAddressDto.ID)
            {
                return BadRequest("Adres ID eşleşmedi.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var address = _mapper.Map<Address>(updateUserAddressDto);
            _addressService.TUpdate(address);
            return Ok("Adres başarıyla güncellendi.");
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var address = _addressService.TGetById(id);
            if (address == null)
            {
                return NotFound("Adres bulunamadı.");
            }
            _addressService.TDelete(address);
            return Ok("Adres başarıyla silindi.");
        }
    }
}

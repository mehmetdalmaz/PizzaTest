using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaTest.Business.Abstract;
using PizzaTest.Dto.Dtos.OrderDetailDto;
using PizzaTest.Dto.Dtos.OrderDto;
using PizzaTest.Entity.Concrete;
using System.Security.Claims;

namespace PizzaTest.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                throw new UnauthorizedAccessException("Token geçersiz veya kullanıcı doğrulanmamış.");

            return int.Parse(userIdClaim.Value);
        }

        [HttpGet("getall")]

        public ActionResult<List<ResultOrderDto>> GetAllOrders()
        {
            var orders = _orderService.TGetList();
            var resultOrderDto = _mapper.Map<List<ResultOrderDto>>(orders);
            return Ok(resultOrderDto);
        }


        [HttpPost("create")]
        public IActionResult CreateOrder(CreateOrderDto createOrderDto)
        {
            try
            {
                var userId = GetUserId();
                var orderId = _orderService.CreateOrder(createOrderDto, userId);
                return Ok(new { Message = "Sipariş başarıyla oluşturuldu.", OrderId = orderId });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("myorders")]
        public ActionResult<List<ResultOrderDto>> GetOrders()
        {
            var userId = GetUserId();
            var orders = _orderService.TGetByUserId(userId);
            var resultOrderDto = _mapper.Map<List<ResultOrderDto>>(orders);
            return Ok(resultOrderDto);
        }
    }
}


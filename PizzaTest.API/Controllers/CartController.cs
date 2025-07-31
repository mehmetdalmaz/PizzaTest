using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaTest.Business.Abstract;
using PizzaTest.Dto.Dtos.CartDto;
using System.Security.Claims;

namespace PizzaTest.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public CartController(ICartService cartService, IProductService productService, IMapper mapper)
        {
            _cartService = cartService;
            _productService = productService;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<ResultCartDto> GetCart()
        {
            var userId = GetUserId();
            var cart = _cartService.GetOrCreateCart(userId);
            if (cart == null)
                return NotFound("Cart bulunamadı");

            var cartDto = _mapper.Map<ResultCartDto>(cart);
            return Ok(cartDto);
        }

        [HttpPost]
        public IActionResult AddItemToCart(int productId, int quantity)
        {
            var userId = GetUserId();
            var cart = _cartService.GetOrCreateCart(userId);
            var product = _productService.TGetById(productId);

            if (product == null)
                return NotFound("Product not found");

            _cartService.AddItem(cart, product, quantity);
            var cartDto = _mapper.Map<CreateCartDto>(cart);
            return Ok(cartDto);
        }

        [HttpDelete("{productId}")]
        public IActionResult RemoveItemFromCart(int productId)
        {
            var userId = GetUserId();
            var cart = _cartService.GetOrCreateCart(userId);

            if (cart == null)
                return NotFound("Cart not found");

            _cartService.RemoveItem(cart, productId, quantity: 1);
            var cartDto = _mapper.Map<CreateCartDto>(cart);
            return Ok(cartDto);
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                throw new UnauthorizedAccessException("Token geçersiz veya kullanıcı doğrulanmamış.");

            return int.Parse(userIdClaim.Value);
        }
    }
}

using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaTest.Business.Abstract;
using PizzaTest.Dto.Dtos.ProductDto;
using PizzaTest.Entity.Concrete;

namespace PizzaTest.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var products = _productService.TGetProductsWithCategory(); 
            var productDtos = _mapper.Map<List<ResultProductDto>>(products);
            return Ok(productDtos);

        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var product = _productService.TGetById(id);
            if (product == null)
            {
                return NotFound("Ürünler bulunamadı.");
            }
            var productDto = _mapper.Map<ResultProductDto>(product);
            return Ok(productDto);
        }


        [HttpPost]
        public IActionResult Create([FromBody] CreateProductDto createProductDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var product = _mapper.Map<Products>(createProductDto);
            _productService.TInsert(product);
            return Ok("Ürün başarıyla eklendi.");
        }


        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateProductDto updateProductDto)
        {
            if (id != updateProductDto.ID)
            {
                return BadRequest("Ürün ID eşleşmedi.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var product = _mapper.Map<Products>(updateProductDto);
            _productService.TUpdate(product);
            return Ok("Ürün başarıyla güncellendi.");
        }



        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var product = _productService.TGetById(id);
            if (product == null)
            {
                return NotFound("Ürün bulunamadı.");
            }
            _productService.TDelete(product);
            return Ok("Ürün başarıyla silindi.");
        }
    }
}

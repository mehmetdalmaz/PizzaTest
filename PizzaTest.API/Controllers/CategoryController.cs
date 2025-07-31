using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaTest.Business.Abstract;
using PizzaTest.Dto.Dtos.CategoryDto;
using PizzaTest.Entity.Concrete;

namespace PizzaTest.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var categories = _categoryService.TGetList();
            if (categories == null || !categories.Any())
            {
                return NotFound("Kategoriler yok.");
            }
            var categoryDtos = _mapper.Map<List<ResultCategoryDto>>(categories);
            return Ok(categoryDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var category = _categoryService.TGetById(id);
            if (category == null)
            {
                return NotFound("Kategori bulunamadı.");
            }
            var categoryDto = _mapper.Map<ResultCategoryDto>(category);
            return Ok(categoryDto);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateCategoryDto createCategoryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var category = _mapper.Map<Category>(createCategoryDto);
            _categoryService.TInsert(category);
            return Ok("Kategori başarıyla eklendi.");
        }


        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateCategoryDto updateCategoryDto)
        {
            if (id != updateCategoryDto.ID)
            {
                return BadRequest("Kategori ID eşleşmedi.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var category = _mapper.Map<Category>(updateCategoryDto);
            _categoryService.TUpdate(category);
            return Ok("Kategori başarıyla güncellendi.");
        }



        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var category = _categoryService.TGetById(id);
            if (category == null)
            {
                return NotFound("Kategori bulunamadı.");
            }
            _categoryService.TDelete(category);
            return Ok("Kategori başarıyla silindi.");
        }
    }
}

using PizzaTest.Dto.Dtos.ProductDto;


namespace PizzaTest.Dto.Dtos.CategoryDto
{
    public class ResultCategoryDto
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public List<ResultProductDto>? Products { get; set; }
    }
}

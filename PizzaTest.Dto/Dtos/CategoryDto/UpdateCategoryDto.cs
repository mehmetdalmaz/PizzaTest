using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Dto.Dtos.CategoryDto
{
    public class UpdateCategoryDto
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

    }
}

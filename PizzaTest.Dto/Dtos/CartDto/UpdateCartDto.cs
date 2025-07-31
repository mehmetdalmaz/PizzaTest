using PizzaTest.Dto.Dtos.CartitemsDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Dto.Dtos.CartDto
{
    public class UpdateCartDto
    {
        public List<UpdateCartItemDto> CartItems { get; set; }
    }
}

using PizzaTest.Dto.Dtos.OrderDto;
using PizzaTest.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Business.Abstract
{
    public interface IOrderService : IGenericService<Order>
    {
        int CreateOrder(CreateOrderDto createOrderDto, int userID);
        List<ResultOrderDto> TGetByUserId(int userID);
    }
}

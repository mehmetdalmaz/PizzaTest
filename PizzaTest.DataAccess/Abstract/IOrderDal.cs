using PizzaTest.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.DataAccess.Abstract
{
    public interface IOrderDal : IGenericDal<Order>
    {
        List<Order> TGetByUserId(int userID);
        List<Order> GetAllOrderAdmin();
    }
}

using PizzaTest.Business.Abstract;
using PizzaTest.DataAccess.Abstract;
using PizzaTest.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Business.Concrete
{
    public class OrderDetailsManager : IOrderDetailService
    {
        private readonly IOrderDetailDal _orderDetailsDal;
        public OrderDetailsManager(IOrderDetailDal OrderDetailsDal)
        {
            _orderDetailsDal = OrderDetailsDal;
        }
        public void TDelete(OrderDetails t)
        {
            _orderDetailsDal.Delete(t);
        }

        public OrderDetails TGetById(int id)
        {
            return _orderDetailsDal.GetById(id);
        }

        public List<OrderDetails> TGetList()
        {
            return _orderDetailsDal.GetList();
        }

        public void TInsert(OrderDetails t)
        {
            _orderDetailsDal.Insert(t);
        }

        public void TUpdate(OrderDetails t)
        {
            _orderDetailsDal.Update(t);
        }
    }
}

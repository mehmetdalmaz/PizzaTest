using AutoMapper;
using PizzaTest.Business.Abstract;
using PizzaTest.DataAccess.Abstract;
using PizzaTest.DataAccess.EntityFramework;
using PizzaTest.Dto.Dtos.OrderDto;
using PizzaTest.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaTest.Business.Concrete
{
    public class OrderManager : IOrderService
    {
        private readonly IOrderDal _orderDal;
        private readonly ICartService _cartService;
        private readonly IProductService _productService;
        private readonly IMapper _mapper;
        public OrderManager(IOrderDal OrderDal, ICartService cartService, IProductService productService)
        {
            _orderDal = OrderDal;
            _productService = productService;
            _cartService = cartService;
        }

        public int CreateOrder(CreateOrderDto createOrderDto, int userID)
        {
            // Kullanıcının sepetini al
            var cart = _cartService.GetOrCreateCart(userID);
            if (cart == null || cart.CartItems == null || !cart.CartItems.Any())
                throw new Exception("Sepet boş.");

            // Yeni sipariş oluştur
            var newOrder = new Order
            {
                UserID = userID,
                OrderDate = DateTime.Now,
                DeliveryDate = DateTime.Now.AddDays(2),
                TotalPrice = cart.CartItems.Sum(ci => ci.Quantity * ci.Product.Price),
                OrderNote = createOrderDto.OrderNote,
                AddressID = createOrderDto.AddressID,
                OrderDetails = new List<OrderDetails>()
            };

            foreach (var item in cart.CartItems)
            {
                var product = _productService.TGetById(item.ProductID);
                if (product == null)
                    throw new Exception($"Ürün bulunamadı: {item.ProductID}");

                if (product.StockQuantity < item.Quantity)
                    throw new Exception($"'{product.Name}' ürünü için yeterli stok yok.");

                // Sipariş detayına ekle
                newOrder.OrderDetails.Add(new OrderDetails
                {
                    ProductID = item.ProductID,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price
                });

                // Stok azalt
                product.StockQuantity -= item.Quantity;
                _productService.TUpdate(product);
            }

            // Siparişi kaydet
            _orderDal.Insert(newOrder);

            // Sepeti temizle
            _cartService.ClearCart(cart.ID);

            return newOrder.ID;
        }

        public void TDelete(Order t)
        {
            _orderDal.Delete(t);
        }

        public Order TGetById(int id)
        {
            return _orderDal.GetById(id);
        }

        public List<ResultOrderDto> TGetByUserId(int userID)
        {
            var orders = _orderDal.TGetByUserId(userID);
            var mappedOrders = _mapper.Map<List<ResultOrderDto>>(orders);
            return mappedOrders;
        }

        public List<Order> TGetList()
        {
            return _orderDal.GetAllOrderAdmin();
        }

        public void TInsert(Order t)
        {
            _orderDal.Insert(t);
        }

        public void TUpdate(Order t)
        {
            _orderDal.Update(t);
        }
    }
}

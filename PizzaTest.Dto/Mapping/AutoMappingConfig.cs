using AutoMapper;
using PizzaTest.Dto.Dtos.AddressDto;
using PizzaTest.Dto.Dtos.CartitemsDto;
using PizzaTest.Dto.Dtos.CategoryDto;
using PizzaTest.Dto.Dtos.OrderDto;
using PizzaTest.Dto.Dtos.ProductDto;
using PizzaTest.Dto.Dtos.CartDto;
using PizzaTest.Entity.Concrete;
using PizzaTest.Dto.Dtos.OrderDetailDto;


namespace HotelProject.WebUI.Mapping
{
    public class AutoMappingConfig : Profile
    {
        public AutoMappingConfig()
        {
            CreateMap<Category, ResultCategoryDto>().ReverseMap();
            CreateMap<Category, CreateCategoryDto>().ReverseMap();
            CreateMap<Category, UpdateCategoryDto>().ReverseMap();


            CreateMap<Order, ResultOrderDto>().ReverseMap();
            CreateMap<Order, CreateOrderDto>().ReverseMap();
            CreateMap<Order, UpdateOrderDto>().ReverseMap();



            CreateMap<OrderDetails, ResultOrderDetailDto>().ReverseMap();
            CreateMap<CreateOrderDetailDto, OrderDetails>()
                .ForMember(dest => dest.UnitPrice, opt => opt.MapFrom(src => src.ProductPrice));


            CreateMap<Products, ResultProductDto>().ReverseMap();
            CreateMap<Products, CreateProductDto>().ReverseMap();
            CreateMap<Products, UpdateProductDto>().ReverseMap();


            CreateMap<Address, ResultUserAddressDto>().ReverseMap();
            CreateMap<Address, CreateUserAddressDto>().ReverseMap();
            CreateMap<Address, UpdateUserAddressDto>().ReverseMap();


            CreateMap<Cart, ResultCartDto>().ReverseMap();
            CreateMap<Cart, CreateCartDto>().ReverseMap();
            CreateMap<Cart, UpdateCartDto>().ReverseMap();


            CreateMap<CartItems, ResultCartItemDto>().ReverseMap();
            CreateMap<CartItems, CreateCartItemDto>().ReverseMap();
            CreateMap<CartItems, UpdateCartItemDto>().ReverseMap();

        }
    }
}

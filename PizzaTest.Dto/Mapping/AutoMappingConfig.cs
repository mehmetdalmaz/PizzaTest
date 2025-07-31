using AutoMapper;
using PizzaTest.Dto.Dtos.AddressDto;
using PizzaTest.Dto.Dtos.CartitemsDto;
using PizzaTest.Dto.Dtos.CategoryDto;
using PizzaTest.Dto.Dtos.OrderDto;
using PizzaTest.Dto.Dtos.ProductDto;
using PizzaTest.Dto.Dtos.CartDto;
using PizzaTest.Entity.Concrete;
using PizzaTest.Dto.Dtos.OrderDetailDto;
using PizzaTest.Dto.Dtos.AuthDto;


namespace HotelProject.WebUI.Mapping
{
    public class AutoMappingConfig : Profile
    {
        public AutoMappingConfig()
        {
            // CATEGORY
            CreateMap<Category, ResultCategoryDto>().ReverseMap();
            CreateMap<Category, CreateCategoryDto>().ReverseMap();
            CreateMap<Category, UpdateCategoryDto>().ReverseMap();

            // PRODUCT
            CreateMap<Products, ResultProductDto>().ReverseMap();
            CreateMap<Products, CreateProductDto>().ReverseMap();
            CreateMap<Products, UpdateProductDto>().ReverseMap();

            // ADDRESS
            CreateMap<Address, ResultUserAddressDto>().ReverseMap();
            CreateMap<Address, CreateUserAddressDto>().ReverseMap();
            CreateMap<Address, UpdateUserAddressDto>().ReverseMap();

            // CART
            CreateMap<Cart, ResultCartDto>().ReverseMap();
            CreateMap<Cart, CreateCartDto>().ReverseMap();
            CreateMap<Cart, UpdateCartDto>().ReverseMap();

            // CART ITEMS
            CreateMap<CartItems, ResultCartItemDto>().ReverseMap();
            CreateMap<CartItems, CreateCartItemDto>().ReverseMap();
            CreateMap<CartItems, UpdateCartItemDto>().ReverseMap();

            // ORDER
            CreateMap<Order, ResultOrderDto>()
                .ForMember(dest => dest.OrderDate, opt => opt.MapFrom(src => src.OrderDate))
                .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.TotalPrice))
                .ForMember(dest => dest.AddressID, opt => opt.MapFrom(src => src.Address))
                .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails));

            CreateMap<Order, UpdateOrderDto>().ReverseMap();

            // Order oluştururken CreateOrderDto'dan Order'a map
            CreateMap<CreateOrderDto, Order>()
                .ForMember(dest => dest.OrderDate, opt => opt.Ignore())
                .ForMember(dest => dest.DeliveryDate, opt => opt.Ignore())
                .ForMember(dest => dest.TotalPrice, opt => opt.Ignore())
                .ForMember(dest => dest.UserID, opt => opt.Ignore())
                .ForMember(dest => dest.OrderDetails, opt => opt.Ignore())
                .ForMember(dest => dest.Address, opt => opt.Ignore());

            // ORDER DETAILS
            CreateMap<OrderDetails, ResultOrderDetailDto>().ReverseMap();

            // CreateOrderDetailDto → OrderDetails (fiyat sonradan set edilecek)
            CreateMap<CreateOrderDetailDto, OrderDetails>()
                .ForMember(dest => dest.UnitPrice, opt => opt.Ignore());

            CreateMap<RegisterDto, User>().ReverseMap();
            CreateMap<LoginDto, User>().ReverseMap();
        }
    }
}

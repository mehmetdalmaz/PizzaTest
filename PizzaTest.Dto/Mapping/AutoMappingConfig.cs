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
using PizzaTest.Dto.Dtos.UserDto;


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

            // USER
            CreateMap<User, ResultUserDto>().ReverseMap();
            CreateMap<User, UpdateUserDto>().ReverseMap();

            // CART ITEMS
            CreateMap<CartItems, ResultCartItemDto>().ReverseMap();
            CreateMap<CartItems, CreateCartItemDto>().ReverseMap();
            CreateMap<CartItems, UpdateCartItemDto>().ReverseMap();

            // ORDER
            CreateMap<Order, ResultOrderDto>()
                        .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.ID))
                        .ForMember(dest => dest.UserID, opt => opt.MapFrom(src => src.UserID))
                        .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.Name))
                        .ForMember(dest => dest.UserSurname, opt => opt.MapFrom(src => src.User.Surname))
                        .ForMember(dest => dest.AddressID, opt => opt.MapFrom(src => src.AddressID))
                        .ForMember(dest => dest.AddressLine1, opt => opt.MapFrom(src => src.Address.AddressLine1))
                        .ForMember(dest => dest.AddressLine2, opt => opt.MapFrom(src => src.Address.AddressLine2))
                        .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.Address.City))
                        .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.Address.State))
                        .ForMember(dest => dest.PostalCode, opt => opt.MapFrom(src => src.Address.PostalCode))
                        .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.Address.Country))
                        .ForMember(dest => dest.OrderDate, opt => opt.MapFrom(src => src.OrderDate))
                        .ForMember(dest => dest.DeliveryDate, opt => opt.MapFrom(src => src.DeliveryDate))
                        .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.TotalPrice))
                        .ForMember(dest => dest.OrderNote, opt => opt.MapFrom(src => src.OrderNote))
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
            CreateMap<OrderDetails, ResultOrderDetailDto>()
           .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.ID))
           .ForMember(dest => dest.OrderID, opt => opt.MapFrom(src => src.OrderID))
           .ForMember(dest => dest.ProductID, opt => opt.MapFrom(src => src.ProductID))
           .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name))
           .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
           .ForMember(dest => dest.ProductPrice, opt => opt.MapFrom(src => src.UnitPrice))
           .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.Quantity * src.UnitPrice));

            // CreateOrderDetailDto → OrderDetails (fiyat sonradan set edilecek)
            CreateMap<CreateOrderDetailDto, OrderDetails>()
                .ForMember(dest => dest.UnitPrice, opt => opt.Ignore());

            CreateMap<RegisterDto, User>().ReverseMap();
            CreateMap<LoginDto, User>().ReverseMap();
        }
    }
}

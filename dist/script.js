//header
// -> logo
// -> search
// -> basket + account

//item

//footer
// -> subscribe block
// -> brand etc
// -> all rights reserved

const API = 'http://localhost:3000/api';

const sendRequest = (path, method = 'GET', body = {}) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.timeout = 10000;

        xhr.ontimeout = () => {
            console.log('timeout!');
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    console.log('Error! not 200', xhr.responseText, xhr.status);
                    reject('Error!', xhr.responseText);
                }
            }
        }

        xhr.open(method, `${API}/${path}`);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(body));
    });
}


Vue.component('v-logo', {
    template: `
        <a href="index.html" class="logo">
            <img src="img/logo.png" alt="logo">
            <span class="logo_name">BRAN<span class="color_text">D</span></span>
        </a>
    `
})

Vue.component('v-basket', {
    props: ['item'],
    methods: {
        removeItem() {
            this.$emit('removeItem', this.item.productId);
        },
    },
    template: `
    <div>
            <div class="drop_cart_item">
            <a :href="item.productLink">
                <div class="drop_cart_item_in">
                    <img :src="item.productImg" class="drop_cart_item_img">
                    <p class="drop_cart_item_in_text">{{ item.productTitle }}</p>
                    <img :src="item.imgstars" alt="" drop_cart_item_img_stars>
                    <p class="drop_cart_item_in_text color_text">{{ item.quantity }} x {{ item.productPrice }}</p>
                </div>
                </a>
                <i class="fas fa-times-circle table_cart_cross"
                @click="removeItem()"></i>
            </div>
    </div>
    `
})


Vue.component('v-header', {
    data: function () {
        return {
            woman: [
                {
                    title: 'Dresses',
                    link: '#'
                },
                {
                    title: 'Tops',
                    link: '#'
                },
                {
                    title: 'Sweaters/Knits',
                    link: '#'
                },
                {
                    title: 'Jackets/Coats',
                    link: '#'
                },
                {
                    title: 'Blazers',
                    link: '#'
                },
                {
                    title: 'Denim',
                    link: '#'
                },
                {
                    title: 'Leggings/Pants',
                    link: '#'
                },
                {
                    title: 'Skirts/Shorts',
                    link: '#'
                },
                {
                    title: 'Accessories',
                    link: '#'
                },],
            man: [{
                title: 'Tees/Tank tops',
                link: '#'
            },
            {
                title: 'Shirts',
                link: '#'
            },
            {
                title: 'Sweaters',
                link: '#'
            },
            {
                title: 'Sweatshirts/Hoodies',
                link: '#'
            },
            {
                title: 'Blazers',
                link: '#'
            },
            {
                title: 'Jackets/vests',
                link: '#'
            }],
        }
    },
    props: ['basketgoods', 'searchValue', 'show'],
    methods: {
        handleRemoveItem(data) {
            this.$emit('delete', data);
        }
    },
    computed: {
        totalPriceBasket() {
            return this.basketgoods.reduce((acc, curVal) => {
                return acc + curVal.productPrice * curVal.quantity;
            }, 0);
        },

    },
    template: `
        <header class="header center">
            <div class="header_left">
                <v-logo></v-logo>
                <form class="header_form" action="#">
                    <details class="header_browse">
                        <summary class="header_browse_summary">Browse <i class="fas fa-caret-down summary_caret"></i></summary>
                        <div class="drop drop_browse">
                            <div class="drop_col">
                                <h3 class="drop_h3">Woman</h3>
                                <ul class="drop_ul">
                                    <li v-for="item in woman" :key="item.title">
                                    <a class="drop_link" :href="item.link">{{ item.title }} </a></li>
                                </ul>
                                <h3 class="drop_h3">Man</h3>
                                <ul class="drop_ul">
                                    <li v-for="item in man" :key="item.title">
                                    <a class="drop_link" :href="item.link">{{ item.title }}</a></li>
                                </ul>
                            </div>
                        </div>
                    </details>
                    <input class="header_input" type="text" 
                    v-bind:value="searchValue"
                    @input="$emit('input', $event.target.value)"
                    placeholder="Search for Item...">
                    <button class="header_search_button">
                        <img src="img/search.png" alt="search">
                    </button>
                </form>
            </div>
            <div class="header_right">
        <div class="card">
            <img src="img/card.png" alt="" class="card_img">
            <div class="drop drop_cart">
                <v-basket v-for="item in basketgoods"
                :item="item"
                :key="item.productId"
                @removeItem="handleRemoveItem"> 
                </v-basket>
                
                <div class="drop_cart_price">
                    <p>total</p>
                    <p>$ {{ totalPriceBasket }}</p>
                </div>
                <button class="drop_cart_btn">Checkout</button>
                <a href="cart.html" class="drop_cart_btn drop_cart_btn_cart">Go to cart</a>
            </div>
        </div>
        <a href="checkout.html" class="header_account_button">My Account</a>
        </div>
        </header>
    `
})

Vue.component('v-drop-menu', {
    data: function () {
        return {
            dropMenu: [
                {
                    nameDropMenu: 'All',
                    dropCol: [
                        {
                            titleDropCol: 'Dresses',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Tops',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Sweaters/Knits',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Jackets/Coats',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Blazers',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Denim',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Legging/Pants',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Skirts/Shorts',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Accessories',
                            linkDropCol: '#'
                        }
                    ]
                },
                {
                    nameDropMenu: 'Woman',
                    dropCol: [
                        {
                            titleDropCol: 'Dresses',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Tops',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Sweaters/Knits',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Jackets/Coats',
                            linkDropCol: '#'
                        }
                    ]
                },
                {
                    nameDropMenu: 'Man',
                    dropCol: [
                        {
                            titleDropCol: 'Dresses',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Tops',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Sweaters/Knits',
                            linkDropCol: '#'
                        }
                    ]
                },
                {
                    nameDropMenu: 'Children',
                    dropCol: [
                        {
                            titleDropCol: 'Dresses',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Tops',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Sweaters/Knits',
                            linkDropCol: '#'
                        },
                        {
                            titleDropCol: 'Jackets/Coats',
                            linkDropCol: '#'
                        }
                    ]
                }]
        }
    },
    template: `
        <div class="drop">
            <div class="drop_col" v-for="col in dropMenu" :key="col.nameDropMenu">
                <h3 class="drop_h3">{{ col.nameDropMenu }}</h3>
                <ul class="drop_ul">
                    <li v-for="item in col.dropCol" :key="item.titleDropCol">
                    <a class="drop_link" :href="item.linkDropCol">{{ item.titleDropCol }}</a></li>
                </ul>
            </div>
            <a href="#" class="drop_link_sale"><img src="img/drop_sale.png">
                <p class="drop_link_sale_text">super<br>sale!</p>
            </a>
        </div>
    `
})

Vue.component('v-navigation', {
    data: function () {
        return {
            navigationMenu: [
                {
                    navigationMenuTitle: 'Home',
                    navigationMenuLink: 'index.html'
                },
                {
                    navigationMenuTitle: 'Man',
                    navigationMenuLink: '#'
                },
                {
                    navigationMenuTitle: 'Woman',
                    navigationMenuLink: '#'
                },
                {
                    navigationMenuTitle: 'Kids',
                    navigationMenuLink: '#'
                },
                {
                    navigationMenuTitle: 'Accoseriese',
                    navigationMenuLink: '#'
                },
                {
                    navigationMenuTitle: 'fetured',
                    navigationMenuLink: '#'
                },
                {
                    navigationMenuTitle: 'Hot',
                    navigationMenuLink: '#'
                },
                {
                    navigationMenuTitle: 'Deals',
                    navigationMenuLink: '#'
                },
            ]
        }
    },
    template: `
    <nav class="navigation">
        <ul class="navigation_menu">
            <li class="navigation_menu_list" v-for="item in navigationMenu" :key="item.navigationMenuTitle">
                <a :href="navigationMenuLink" class="navigation_menu_link">{{item.navigationMenuTitle}}</a>
                <v-drop-menu></v-drop-menu>
            </li>
        </ul>
    </nav>
    `
})

Vue.component('v-product', {
    props: ['item'],
    methods: {
        addToBasket() {
            this.$emit('addToBasket', this.item);
        }
    },
    template: `
        <div class="fetured_block product">
            <a :href=item.productLink >
                <img :src=item.productImg alt="shirt" class="fetured_img">
            </a>
            <a href="#" class="fetured_overlay" @click="addToBasket">
                <img class="fetured_overlay_img" src="img/card_white.png"> Add to Cart
            </a>
            <div class="fetured_block_content">
                <a :href=item.productLink class="fetured_link"><p>{{item.productTitle}}</p></a>
                <p class="color_text fetured_block_price">$ {{item.productPrice}}
                    <img class="fetured_stars" src="img/fetured/stars.png">
                </p>
            </div>  
        </div>
    `
})

Vue.component('v-product-list', {
    props: ['goods', 'show'],
    mounted() {
        this.$parent.fetchData(this.show);
        //console.log(this.show);
    },
    methods: {
        handleAddToBasket(data) {
            this.$emit("add", data);
        },
    },
    template: `
        <div>
            <v-product
                v-for="item in goods"
                v-bind:item = "item"
                @addToBasket="handleAddToBasket"
                :key="item.productId"
            >
            </v-product>
        </div>
        `
})

Vue.component('v-advantages', {
    template: `
        <div>
            <a href="#" class="sale_list_block">
            <img src="img/delivery_icon.png" class="sale_list_img">
            <section class="sale_list_section">
                <h3 class="sale_list_section_h3">
                    Free Delivery
                </h3>
                <p class="sale_list_section_content">
                    Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive
                    models.
                </p>
            </section>
            </a>
            <a href="#" class="sale_list_block">
                <img src="img/sale_icon.png" class="sale_list_img">
                <section class="sale_list_section">
                    <h3 class="sale_list_section_h3">
                        Sales & discounts
                    </h3>
                    <p class="sale_list_section_content">
                         Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive
                        models.
                    </p>
                </section>
            </a>
            <a href="#" class="sale_list_block">
                <img src="img/quality_icon.png" class="sale_list_img">
                <section class="sale_list_section">
                     <h3 class="sale_list_section_h3">
                        Quality assurance
                    </h3>
                    <p class="sale_list_section_content">
                        Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive
                        models.
                    </p>
                </section>
            </a>
        </div>
    `
})

Vue.component('v-footernavigate', {
    data: function () {
        return {
            footerMenu: [
                {
                    nameFooterMenu: 'COMPANY',
                    columnFooterMenu: [
                        {
                            titleFooterLink: 'Home',
                            linkFooterLink: 'index.html'
                        },
                        {
                            titleFooterLink: 'Shop',
                            linkFooterLink: '#'
                        },
                        {
                            titleFooterLink: 'About',
                            linkFooterLink: '#'
                        },
                        {
                            titleFooterLink: 'How It Works',
                            linkFooterLink: '#'
                        },
                        {
                            titleFooterLink: 'Contact',
                            linkFooterLink: '#'
                        }
                    ]
                },
                {
                    nameFooterMenu: 'INFORMATION',
                    columnFooterMenu: [
                        {
                            titleFooterLink: 'Tearms & Condition',
                            linkFooterLink: '#'
                        },
                        {
                            titleFooterLink: 'Privacy Policy',
                            linkFooterLink: '#'
                        },
                        {
                            titleFooterLink: 'How to Buy',
                            linkFooterLink: '#'
                        },
                        {
                            titleFooterLink: 'How to Sell',
                            linkFooterLink: '#'
                        },
                        {
                            titleFooterLink: 'Promotion',
                            linkFooterLink: '#'
                        }
                    ]
                },
                {
                    nameFooterMenu: 'SHOP CATEGORY',
                    columnFooterMenu: [
                        {
                            titleFooterLink: 'Men',
                            linkFooterLink: '#'
                        },
                        {
                            titleFooterLink: 'Women',
                            linkFooterLink: '#'
                        },
                        {
                            titleFooterLink: 'Child',
                            linkFooterLink: '#'
                        },
                        {
                            titleFooterLink: 'Apparel',
                            linkFooterLink: '#'
                        },
                        {
                            titleFooterLink: 'Brows All',
                            linkFooterLink: '#'
                        }
                    ]
                }
            ]
        }
    },
    template: `
    <div class="footer_info_navcolumn">
        <nav class="footer_info_column" v-for="col in footerMenu" :key="col.nameFooterMenu">
            <p class="footer_info_column_head">{{col.nameFooterMenu}}</p>
            <ul class="footer_info_nav">
            <li class="footer_info_nav_list" v-for="item in col.columnFooterMenu" :key="item.titleFooterLink">
                <a :href="item.linkFooterLink" class="footer_info_nav_link">{{item.titleFooterLink}}</a>
            </li>
            </ul>
        </nav>
    </div>
    `
})

Vue.component('v-socialmedia', {
    data: function () {
        return {
            socialMedia: [
                {
                    classSocialMedia: 'fab fa-facebook-f icon',
                    linkSocialMedia: '#'
                },
                {
                    classSocialMedia: 'fab fa-twitter icon',
                    linkSocialMedia: '#'
                },
                {
                    classSocialMedia: 'fab fa-linkedin-in icon',
                    linkSocialMedia: '#'
                },
                {
                    classSocialMedia: 'fab fa-pinterest-p icon',
                    linkSocialMedia: '#'
                },
                {
                    classSocialMedia: 'fab fa-google-plus-g icon',
                    linkSocialMedia: '#'
                }],
        }
    },
    template: `
        <ul class="footer_line_socialmedia">
            <li v-for="icon in socialMedia" :key="icon.classSocialMedia">
            <a :href="icon.linkSocialMedia" class="footer_line_socialmedia_link">
            <i :class="icon.classSocialMedia"></i></a>   
            </li>
        </ul>
    `
})

Vue.component('v-sidebar', {
    data: function () {
        return {
            sidebarMenu: [
                {
                    nameSidebarMenu: 'Category',
                    sidebarMenuList: [
                        {
                            sidebarTitle: 'Accessories',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Bags',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Denim',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Hoodies&Sweatshirts',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Jackets&Coats',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Pants',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Polos',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Shirts',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Shoes',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Shorts',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Sweaters&Knits',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'T-shirts',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Tanks',
                            sidebarLink: '#'
                        }
                    ]
                },
                {
                    nameSidebarMenu: 'Brand',
                    sidebarMenuList: [
                        {
                            sidebarTitle: 'Mariner',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Koala',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Love Yourself',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Timeless',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Life is Good',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'High Sky',
                            sidebarLink: '#'
                        }
                    ]
                },
                {
                    nameSidebarMenu: 'Designer',
                    sidebarMenuList: [
                        {
                            sidebarTitle: 'Mark Luter',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Agata Sheron',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Mother Earth',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Brook Ginger',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Elsa Pranevsky',
                            sidebarLink: '#'
                        },
                        {
                            sidebarTitle: 'Maria Lermontova',
                            sidebarLink: '#'
                        }
                    ]
                }
            ]
        }
    },
    template: `
    <div class="sidebar">
        <ul>
            <li class="sidebar_nav_li"
            v-for="sidebar in sidebarMenu" 
            :key="sidebar.nameSidebarMenu">
                <details class="sidebar_det" open>
                    <summary class="sidebar_summary">{{ sidebar.nameSidebarMenu}}</summary>
                    <ul>
                        <li class="sidebar_nav_li_cat"
                        v-for="item in sidebar.sidebarMenuList"
                        :key="item.sidebarTitle">
                        <a :href="item.sidebarLink" class="sidebar_nav_link">{{ item.sidebarTitle }}</a>
                        </li>
                    </ul>
                </details>
            </li>
        </ul>
    </div>
    `
})

new Vue({
    el: '#app',
    data: {
        goods: [],
        searchValue: '',
        basketgoods: [],
        page: 1,
        show: 9
    },
    mounted() {
        //this.fetchData();
        this.fetchBasketData();
    },
    methods: {
        fetchData(countOfGoodsToShow) {
            return new Promise((resolve, reject) => {
                sendRequest(`catalog/${countOfGoodsToShow}`, 'GET')
                    .then((data) => {
                        this.goods = data;
                        resolve();
                    })
                    .catch((error) => {
                        this.errorMessage = 'Не удалось получить список товаров'
                    });
            });
        },
        fetchBasketData() {
            return new Promise((resolve, reject) => {
                sendRequest('basket')
                    .then((data) => {
                        this.basketgoods = data;
                        console.log(this.basketgoods);
                        resolve();
                    })
                    .catch((error) => {
                        this.errorMessage = 'Не удалось получить список товаров'
                    });
            });
        },
        addToBasket(item) {
            sendRequest('basket', 'POST', item)
                .then((result) => {
                    console.log('Result', result);
                    if (!result.success) {
                        console.log('addToBasket Error');
                        return;
                    }
                    console.log(item);
                    const index = this.basketgoods.findIndex((basketItem) => basketItem.productId === item.productId);
                    if (index > -1) {
                        this.basketgoods[index].quantity += 1;
                    } else {
                        this.basketGoods.push({ ...item, quantity: 1 });
                    }
                })
                .catch((error) => {
                    this.errorMessage = 'Не удалось добавить список товаров!';
                });
        },
        removeItem(id) {
            sendRequest(`basket/${id}`, 'DELETE')
                .then((result) => {
                    console.log('Result', result);
                    if (!result.success) {
                        countOfGocountOfGoodsToShowodsToShow
                        console.log('addToBasket Error');
                        return;
                    }
                    this.basketgoods = this.basketgoods.filter((goodsItem) => goodsItem.productId !== parseInt(id));
                    console.log(this.basketgoods);
                })
                .catch((error) => {
                    this.errorMessage = 'Не удалось удалить элемент из корзины'
                });
        },
    },
    computed: {
        filteredGoods() {
            const start = (this.page - 1) * this.show;
            const end = this.page * this.show;
            const regexp = new RegExp(this.searchValue.trim(), 'i');
            // console.log('Search value: ', regexp);
            return this.goods.filter((goodsItem) => regexp.test(goodsItem.productTitle))
                .slice(start, end);
        },
    }
})
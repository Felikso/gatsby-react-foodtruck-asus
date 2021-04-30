import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { graphql, useStaticQuery } from 'gatsby'
import {  GatsbyImage } from 'gatsby-plugin-image'

import './MenuCard.scss'

import wordpressDishesCoppy from './wordpressDishesCoppy.json'

//transitions
import Aos from 'aos';
import 'aos/dist/aos.css';

function MenuCard() {

  const [dishCategory, setDishCategory] = useState("wszystkie")

  useEffect(() => {
    Aos.init({
        duration: 1000
    });
}, [])


const data = useStaticQuery(
  graphql`
    query {
      allWpDish {
    nodes {
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      dishes {
        category
        description
        fieldGroupName
        name
        price
        quantity
      }
    }
  }
    }
  `
)

/*   const data = useStaticQuery(
    graphql`
      query {
        allMenuJson {
          nodes {
            description
            name
            price
            quantity
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }


        HWGraphQL {
        posts {
      nodes {
        featuredImage {
          node {
            sourceUrlSharp {
              childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                    gatsbyImageData
                  }
            }
            title
            sourceUrl
          }
        }
      }
    }
    dishes {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
            sourceUrlSharp {
              childImageSharp {
                gatsbyImageData
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        dishes {
          category
          description
          fieldGroupName
          name
          price
          quantity
        }
      }
    }
  }
      }
      
    `
  )
 */

/*   const wordpressDishes = data.HWGraphQL.dishes.nodes */

  const wordpressDishes = data.allWpDish.nodes


  const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))].filter(function (el) {
      return el !== "";
    });

  };


const nodeDish = wordpressDishes.map(item => item.dishes)



let filteredNodeDish = wordpressDishes

if(dishCategory === "wszystkie"){
  filteredNodeDish = wordpressDishes.filter(item => item.dishes.category === item.dishes.category)
}else{
  filteredNodeDish = wordpressDishes.filter(item => item.dishes.category === dishCategory)
}


  let categories = getUnique(nodeDish, "category");

  categories = ["wszystkie", ...categories];

/*   console.log(categories) */

    return (
        <>


<MenuButtonBox>
{
  categories.map((item, i) => (
    <MenuButton key={i} value={item} onClick={ e => setDishCategory(e.target.value)}>{item}</MenuButton>
  ))
}

</MenuButtonBox>


{filteredNodeDish.map((item, i) => (
              <MenuBox
              data-aos="fade-in"   
              data-aos-offset="200"
              data-aos-delay="0"
              key={i}
              >
              <DishImg
                  className="image-hover-capition__img"
                  key={i}
                  image={item.featuredImage.node.localFile.childImageSharp.gatsbyImageData}
                  alt="cos"
               />

               <DishContent>
               <DishName>{item.dishes.name} <DishQ>{item.dishes.quantity}</DishQ></DishName>
               <DishDesc>{item.dishes.description}</DishDesc>
               </DishContent>

               <DishPrice>
                {item.dishes.price} pln
              </DishPrice>


              </MenuBox>
            ))}



{
              categories.map((item, i) => {
                console.log(item)
                const filtered = filteredNodeDish.filter(item => item === item.dishes.category)
                console.log(filtered)
                console.log(filteredNodeDish)
                return(

                 
                  <>
                   <h1>{item}</h1>
                   {
                  
                    filteredNodeDish.filter(item => item === item.dishes.category).map((item, i)=> {

                      return(
                        <>

                        <p>{item.dishes.name} </p>

                        </>
                      )
                    })
                   }
                  </>
                )

              })
  }




          
           
          
        </>
    )
}


export default MenuCard;

const MenuBox = styled.div`
  background: var(--menu-box-bg);
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  justify-content: space-between;
  border-bottom: solid #808080 1px;
  transition: 1s;
  padding: 10px;

  &:hover {
    background: var(--menu-box-bg-hover);
  }


  @media screen and (max-width: 768px) {
    grid-template-columns: auto;
  }
`

const DishName = styled.h4`
  color: var(--menu-dish-name-color);
  font-size: clamp(1.5rem, 5vw, 2rem);
  text-transform: uppercase;
`

const DishQ = styled.span`
    color: var(--menu-dish-q-color);
    font-size: clamp(1.6rem,5vw, 1rem);
    text-transform: lowercase;
`

const DishImg = styled(GatsbyImage)`

`

const DishContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  padding: 0 10px;


`

const DishDesc = styled.p`
  color: var(--menu-dish-desc-color);
  font-size: clamp(1rem, 2vw, 2rem);
  padding-top: 20px;
`

const DishPrice = styled.span`
  color: var(--menu-dish-price-color);
  display: flex;
  justify-content: flex-end;
  margin: 20px;
  font-size: clamp(1.5rem, 5vw, 2rem);
  align-items: center;
  white-space: nowrap;
  `

const MenuButton = styled.button`

    backface-visibility: hidden;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  background: linear-gradient(0deg,#00003e 0%,#000000 54.433428555424854%,#786721 100%);
  border-radius: 08px;
  border: 0px solid #444;
  border-width: 0px 0px 0px 0px;
  padding: 10px 20px 10px 20px;
    color: #fff;
  font-size: 16px;
  font-family: Helvetica Neue;
  font-weight: 900;
  font-style: normal;
  transition: 1s;


  &:focus {
    color: var(--color-4);
  }
 
`

const MenuButtonBox = styled.div`

  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(150px, 1fr) );
  margin: 20px 0;

`
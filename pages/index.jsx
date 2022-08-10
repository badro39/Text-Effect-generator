import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useEffect, useState } from 'react'

export default function Home() {

  // variables

  const[Text, setText] = useState("")
  const[Flickering, setFlickering] = useState([])
  const [fontFamily, setFontFamily] = useState([])
  const [ChoosenFont, setChoosenFont] = useState("") 
  const [TextSize, setTextSize] = useState("")
  const [TextColor, setTextColor] = useState("")
  const [AnimationType, setAnimationType] = useState("")
  const [AnimationColor, setAnimationColor] = useState("")
  

  const FontFamily = async() =>{
    const res = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBRNpVMrge2vzJbycxjLshfwQ-63GmPvtc")
    const data = await res.json()
    const result = data.items.map(font =>{
      return font.family
    })
    setFontFamily(result)
  }
  useEffect(()=>{
    FontFamily()
    
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Animation Text</title>
        <meta name="description" content="Choose diferent text animations and get their code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.left}>
        {AnimationType == "" &&(
          <div>
            <p style={{fontFamily: ChoosenFont, fontSize: `${TextSize}px`, WebkitTextStroke: `2px ${TextColor}`}}>{Text}</p>
          </div>
        )}
        {AnimationType == "water" &&(
          <div>
            <p style={{fontFamily: ChoosenFont, fontSize: `${TextSize}px`, WebkitTextStroke: `2px ${TextColor}`}}>{Text}</p>
            <p style={{color: AnimationColor, fontFamily: ChoosenFont, fontSize: `${TextSize}px`}} className={styles.water}>{Text}</p>
          </div>
        )}
        {AnimationType == "neon" &&(
          <div>
            <p style={{color: TextColor,textShadow: `0px 0px 40px ${AnimationColor}, 0px 0px 40px ${AnimationColor}` ,fontFamily: ChoosenFont, fontSize: `${TextSize}px`}}>{Text}</p>
          </div>
        )}
        {AnimationType == "Line" &&(
          <div>
            <p className={styles.line} style={{fontSize: `${TextSize}px`}}>{Text}</p>
          </div>
        )}
        {/* {AnimationType == "flickering" && (
          <div>
            {() =>{
                let letter = ''
                for(let i = 1; i < Text.length; i++) {
                  {i % 2 == 0 ? 
                  letter += <p style={{color: TextColor, fontSize: TextSize}}>{Text.split('')[i]}</p> : 
                  letter += <p style={{color: "grey", fontSize: TextSize}}>{Text.split('')[i]}</p>
                  }
                }
                return letter
              } 
            }
          </div>
        )} */}
      </section>
      <section className={styles.right}>
        <div className='container'>
          <div className={styles.textOptions}>
            <div className={styles.text}>
              <p>Title</p>
              <input type="text" name="text" placeholder='write your text' onChange={(e)=>{
                e.preventDefault()
                setText(e.target.value)}}/>
            </div>
            <div className={styles.font}>
              <div className={styles.family}>
                <p>Font Family</p>
                <select name="fontfamily" onChange={(e) => {
                  e.preventDefault()
                  setChoosenFont(e.target.value)}}>
                  {fontFamily.map(font =>{
                    return(
                      <option key={fontFamily.indexOf(font).toString()}>{font}</option>
                    )
                  })}
                </select>
              </div>
              <div className={styles.color}>
                <p>Text Color</p>
                <input type="color" name="color" onChange={(e) => {
                  e.preventDefault()
                  setTextColor(e.target.value)}}/>
              </div>
            </div>
            <div className={styles.size}>
              <p>Text Size ({TextSize} px)</p>
              <input type="range" name="range" min="0" max="200" onChange={(e) => {
                e.preventDefault()
                setTextSize(e.target.value)}}/>
            </div>
          </div>
          <hr />
          <div className={styles.effect}>
            <div className={styles.TextEffect}>
              <p>Text Effect</p>
            </div>
            <div className={styles.animation}>
              <div className={styles.animationType}>
                <p>Animation type</p>
                <select name="type" onChange={(e) => {
                  e.preventDefault()
                  setAnimationType(e.target.value)}}
                >
                  <option value="">Select Type</option>
                  <option value="water">water wave</option>
                  <option value="neon">neon</option>
                  <option value="Line">Line hover</option>
                </select>
              </div>
              <div className={styles.animationColor}>
                <p>Animation color</p>
                <input type="color" name="animation_color" onChange={(e) =>{
                  e.preventDefault()
                  setAnimationColor(e.target.value)}
                } />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

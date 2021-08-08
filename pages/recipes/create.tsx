import React, {useState, useRef} from 'react'
import { createRecipe } from '../../gql/index';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client';
import Head from 'next/head';
import InputArray from '../../components/InputArray';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/client';


const CreateRecipe = () => {
  const [session, loading] = useSession();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [load, setLoad] = useState(false);
  const [createRecipeMutation] = useMutation(createRecipe);
  const [img, setImg] = useState(null);
  const [fields, setFields] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    category: [''],
    prepTime: 0,
    servingCount: 0
  });

  const router = useRouter();

  const handleImageChange = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImg(e.target.result);
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  if (loading || load) {
    return <Loader />;
  }

  if(!session) {
    return signIn();
  }

  const handleChange = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoad(true);
    let file =  e.currentTarget.querySelector<HTMLInputElement>('#file').files[0]
    if(!file) {
      return
    }
    const data = new FormData()
    data.append('file', file)
    try {
      const res = await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json'
        }
      })

      console.log(res)
      const { image: { _id: image } } = res.data

      await createRecipeMutation({
        variables: {
          recipe: {
            ...fields,
            // @ts-ignore
            prepTime: parseInt(fields.prepTime),
            // @ts-ignore
            servingCount: parseInt(fields.servingCount),
            image
          }
        },
        onError: error => {
          console.log(error);
          setLoad(false);
        },
        onCompleted: (data) => {
          console.log(data);
          router.push('/recipes/' + data.createRecipe.recipe.slug);
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoad(false);
    }
  }
  return (
    <div className='flex flex-col w-full p-4 justify-center items-center'>
      <h1 className='leading-8 font-extrabold text-2xl'>Create a recipe</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 my-2 p-2 w-full mx-auto bg-opacity-10 bg-success rounded shadow'>
        <div className='form-group'>
          <input 
            type='text' id='title' pattern='^[\w \.]{5,40}$'
            name='title'
            value={fields.title}
            onChange={handleChange}
            required
            className='form-control'
          />
          <label htmlFor='title'>Title</label>
        </div>
        <div className='form-group'>
          <textarea
            className='form-control'
            id='description'
            name='description'
            value={fields.description}
            onChange={handleChange}
            rows={5}
            required
          />
          <label htmlFor='description'>Description</label>
        </div>
        <InputArray fieldName='ingredients' array={fields.ingredients} {... {fields, setFields}} placeholder='Salmon' />
        <InputArray fieldName='instructions' array={fields.instructions} {... {fields, setFields}} placeholder='Preheat oven to 350 degrees' />
        <InputArray fieldName='category' array={fields.category} {... {fields, setFields}} placeholder='Fish, Gluten Free' />
        <div className='form-group'>
          <input
            type='number'
            id='prepTime'
            name='prepTime'
            value={fields.prepTime}
            onChange={handleChange}
            required
            className='form-control'
          />
          <label htmlFor='prepTime'>Prep Time <small className='text-gray-400'>
            (minutes)</small></label>
        </div>
        <div className='form-group'>
          <input
            type='number'
            id='servingCount'
            name='servingCount'
            value={fields.servingCount}
            onChange={handleChange}
            required
            className='form-control'
          />
          <label htmlFor='servingCount'>Serving Count</label>
        </div>
        
        <div className="flex flex-col gap-2 p-2">
        <input accept='image/*' className='hidden file' ref={fileInputRef} type='file' id='file' required onChange={e => {
          console.log(e.target.files[0])
          const file = e.target.files[0]
          if(file) {
            handleImageChange(e)
          } else {
            setImg(null)
          }
        }} />
        <div className='cursor-pointer ref w-full bg-blue-400 rounded p-2 text-white flex items-center justify-center gap-2' onClick={() => {
          fileInputRef.current.click()
        }}>
          {
            fileInputRef.current?.files?.length > 0 ?  fileInputRef.current.files[0].name : 'Add Image'
          }
          <i className='fa fa-camera' />
        </div>
        { img && (
          <div className='flex flex-col w-full justify-center items-center relative'>
            <i className='fa fa-trash text-danger cursor-pointer text-lg absolute top-2 right-2'
              onClick={() => {
                setImg(null)
                fileInputRef.current.value = null
              }}
            />
            <img src={img} className='w-full h-auto object-cover' />
          </div>
        ) }
        </div>
        <button type='submit' className='btn btn-primary flex items-center justify-center gap-2'>
          <h3>Create Recipe</h3>
          <i className='fa fa-upload' />
        </button>
      </form>
    </div>
  )
}

export default CreateRecipe

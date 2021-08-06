import Profile from '../models/Profile';
import User from '../models/User'
import Recipe from '../models/Recipe';
import Category from '../models/Category';
import slugify from '../utils/slugify';

const resolvers = {
  Query: {
    async me(parent, args, context) {
      try {
        const { profile } = context;
        
        return profile || null;
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async getRecipe(parent, {id}, context) {
      try {
        const recipe = await Recipe.findOne({ id }).populate('author');
        return recipe || null;
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async findRecipes(parent, args, context) {
      let rgx = new RegExp(args.query, 'i');
      try {
        const recipes = await Recipe.find({ $or: [
          { title: { $regex: rgx }},
          { description: { $regex: rgx }},
          {  ingredients: { $regex: rgx }},
          {  category: { $regex: rgx }}
        ]}).populate('author').sort({ likeCount: -1 }).limit(10);
        return recipes || null;
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async getPopularRecipes(parent, args, context) {
      try {
        const recipes = await Recipe.find({}).populate('author').sort({ likeCount: -1 }).limit(10);
        return recipes || null;
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async getRecipeBySlug(parent, {slug}, context) {
      try {
        const recipe = await Recipe.findOne({ slug });
        return recipe || null;
      } catch (error) {
        console.log(error)
        return null
      }
    }
    
  },
  Mutation: {
    async createRecipe(parent, args, context) {
      try {
        console.log(args.recipe, 'recipe input')
        const { session, profile } = context;

        if(session.user && profile) {
          let slug = slugify(args.recipe.title);

          // check if slug already exists
          let rcp = await Recipe.findOne({ slug });
          if(rcp) {
            slug += '-' + Math.floor(Math.random() * 100000);
          }
          const recipe = new Recipe({
            ...args.recipe,
            author: profile._id,
            slug
          });
          await recipe.save();
          profile.recipes.push(recipe._id);
          await profile.save();
          return recipe;
        }
        return null;
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async saveRecipe(parent, args, context) {
      try {
        const { session, profile } = context;
        if(session.user && profile) {
          const recipe = await Recipe.findOne({ _id: args.id });
          if(recipe) {
            console.log(args.id);
            let index = profile.savedRecipes.indexOf(args.id)
            if(index == -1) {
              profile.savedRecipes.push(args.id);
              recipe.likeCount += 1;
              console.log('saved')
            } else {
              profile.savedRecipes.splice(index, 1);
              recipe.likeCount += -1;
              console.log('unsaved')
            }
            await profile.save();
            console.log(profile.savedRecipes);
            await recipe.save();
            return recipe;  
          }
        }
        return null;
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async updateRecipe(parent, args, context) {
      try {
        const { session, profile } = context;
        if(session.user && profile) {
          const recipe = await Recipe.findOne({ _id: args.id });
          console.log(recipe.author, profile._id);
          if(recipe && recipe.author.toString() == profile._id.toString()) {
            let updatedRecipe = await Recipe.findByIdAndUpdate(args.id, {
              ...args.recipe
            }, { new: true });
            return updatedRecipe;
          }
        }

        throw new Error('You are not authorized to update this recipe')
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async deleteRecipe(parent, args, context) {
      try {
        const { session } = context;
        if(session.user) {
          const recipe = await Recipe.findOne({ _id: args.id }).populate({
            path: 'author',
            populate: {
              path: 'user',
            }
          })
          if(!recipe) {
            return null;
          }
          console.log(`${recipe.author.user._id} === ${session.user.id}`)
          if (recipe.author.user._id.toString() === session.user.id) {
            await recipe.remove();
          }
          return recipe;
        }
        return null;
      } catch (error) {
        console.log(error)
        return null
      }
    }
  },
  Profile: {
    id(parent, args, context) {
      return parent.id || parent._id || null;
    },
    async user(parent, args, context) {
      try {
        const user = await User.findOne({ _id: parent.user })
        return user || null;
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async recipes(parent, args, context) {
      try {
        const recipes = await Recipe.find({ author: parent.id }).populate('author');
        return recipes || null;
      } catch (error) {
        console.log(error)
        return null
      }
    },
    async savedRecipes(parent, args, context) {
      try {
        const recipeId = parent.savedRecipes || [];
        const recipes = await Recipe.find({ _id: recipeId }).populate('author');
        return recipes || null;
      } catch (error) {
        console.log(error)
        return null
      }
    }
  },
  Recipe: {
    id(parent, args, context) {
      return parent.id || parent._id || null;
    },
    async author(parent, args, context) {
      try {
        const profile = await Profile.findOne({ _id: parent.author });
        return profile || null;
      } catch (error) {
        console.log(error)
        return null
      }
    },
  }
}

export default resolvers
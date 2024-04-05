<template>
    <div>
        <h2>Writer's Functions Demo</h2>
        <form>
            <div>
                <label>New Article:</label><br>
                <textarea id="writeArticle" name="writeArticle" rows="15" cols="100"></textarea>
            </div>
           <div>
                <button type="submit" @click="newArticle">Submit</button>
           </div>
            
        </form>
            

    </div>
</template>

<script>
export default {
  name: 'WriterFunction'
  
}
</script>
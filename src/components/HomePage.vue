<template>
    <div>
        <h1>Welcome to BookBridges</h1>
        <form>
            <div>
                <!-- <a href="">Writer's Functions Demo</a> -->
                <h3><router-link to="/writer">Writer's Functions Demo</router-link></h3>
            </div>
            <div>
                <h3><a href="">Reader's Functions Demo</a></h3>                
            </div>
            <div>
                <h3><a href="">Administrator's Functions Demo</a></h3>
            </div>
            
        </form>           

    </div>
</template>

<script>
export default {
  name: 'HomePage'
  
}
</script>
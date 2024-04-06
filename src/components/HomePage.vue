<template>
    <div>
        <h2>Welcome to BookBridges</h2>
        <form>
            <div>
                <!-- <a href="">Writer's Functions Demo</a> -->
                <router-link to="/writer">Writer's Functions Demo</router-link>
            </div>
            <div>
                <a href="">Reader's Functions Demo</a>                
            </div>
            <div>
                <a href="">Administrator's Functions Demo</a>
            </div>
            
        </form>
            

    </div>
</template>

<script>
export default {
  name: 'HomePage'
  
}
</script>
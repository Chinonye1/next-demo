"use server"
import { supabase } from '@/utils/supabase/server';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Comments = async () => {
    const { data: posts } = await supabase.from("posts").select();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ padding: 10 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Body</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts && posts.map((post: PostType) => (
                        <TableRow key={post.id}>
                            <TableCell component="th" scope="row">
                                {post.user_id}
                            </TableCell>
                            <TableCell align="right">{post.id}</TableCell>
                            <TableCell align="right">{post.title}</TableCell>
                            <TableCell align="right">{post.body}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Comments